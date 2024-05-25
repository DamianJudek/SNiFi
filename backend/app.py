import asyncio
import logging
import os
import uuid
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime

from adguardhome import AdGuardHome as Adg
from flasgger import Swagger
from flask import Flask
from flask_restful import Api, Resource, reqparse
from nmap import PortScannerError
from pymongo import MongoClient

from util.iputil import get_default_gateway_ip
from daemon.device_daemon import update_devices_with_scan_result
from daemon.discovery_daemon import discovery_scan
from daemon.nmap_daemon import subnet_quickscan

logger = logging.getLogger(__name__)

app = Flask(__name__)
api = Api(app)
swagger = Swagger(app, template={
    "info": {
        "title": "SNiFi API",
        "version": "1.0"
    },
    "tags": [
        {"name": "devices", "description": "Discovered devices information"},
        {"name": "scans", "description": "Network scan management"},
        {"name": "dns", "description": "Dns proxy management"},
        {"name": "other", "description": "Miscellaneous"}
    ],
})

executor = ThreadPoolExecutor(max_workers=4)

mongo_url = 'mongodb://localhost:27017/'

client = MongoClient(mongo_url)
db = client['snifi-db']
scan_status_collection = db['scan_status']
scan_result_collection = db['scan_result']
device_collection = db['devices']


class Devices(Resource):
    def get(self):
        """
        Gets a list of all devices found on the network.
        ---
        tags:
          - devices
        responses:
            200:
                description: List of devices
        """

        return list(device_collection.find({}, {'_id': False}))


class StartDiscovery(Resource):
    def post(self):
        """
        Starts a discovery scan of the network. Returns ips with associated mac addresses (host will not show up if mac address is not found)
        ---
        tags:
          - scans
        responses:
          200:
            description: Scan started successfully
        """

        uid = str(uuid.uuid4())

        logger.info(f'Starting scan with id: {uid}')

        executor.submit(self.start_discovery, uid)

        return {'scanId': uid}

    def start_discovery(self, uid: str):
        logger.info(f'Scan {uid} started')

        scan_status_collection.insert_one(
            {
                'startTime': str(datetime.now()),
                'scanId': uid,
                'type': 'discovery',
                'status': 'running',
                'progress': 0.0
            }
        )

        def indicate_progress(progress):
            scan_status_collection.update_one(
                {
                    'scanId': uid
                },
                {
                    '$set': {
                        'progress': progress
                    }
                }
            )

        try:
            scan_result = discovery_scan(get_default_gateway_ip() + '/24', progress_callback=indicate_progress)
        except PortScannerError as e:
            logger.exception(f'Scan {uid} failed')
            scan_status_collection.update_one(
                {
                    'scanId': uid
                },
                {
                    '$set': {
                        'status': 'failed',
                        'endTime': str(datetime.now()),
                        'error': e.value
                    },
                    '$unset': {
                        'progress': 0.0
                    }
                }
            )
            return

        logger.debug(f'Scan result: {scan_result}')
        scan_result_collection.insert_one(
            {
                'scanId': uid,
                'timestamp': str(datetime.now()),
                'type': 'discovery',
                'uphosts': len(scan_result),
                'result': scan_result
            }
        )

        scan_status_collection.update_one(
            {
                'scanId': uid
            },
            {
                '$set': {
                    'status': 'completed',
                    'endTime': str(datetime.now())
                },
                '$unset': {
                    'progress': 0.0
                }
            }
        )

        logger.info(f'Scan {uid} completed')

        update_devices_with_scan_result(db, uid)


class Scans(Resource):
    def get(self):
        """
        Gets a list of all scans
        ---
        tags:
          - scans
        responses:
          200:
            description: List of all scans
        """

        all_scans = list(scan_status_collection.find({}, {'_id': False}))
        return all_scans


class ScanResult(Resource):
    def get(self, scan_id):
        """
        Gets the result of a scan
        ---
        tags:
          - scans
        parameters:
          - name: scan_id
            in: path
            type: string
            required: true
            description: Scan id
        responses:
            200:
                description: Scan result
            404:
                description: Scan not found
        """

        scan_result = scan_result_collection.find_one({'scanId': scan_id}, {'_id': False})

        if scan_result is None:
            return {'error': 'Scan not found'}, 404

        return scan_result


class UpdateDevice(Resource):
    def put(self, mac_addr):
        """
        Updates the device with the given mac address
        ---
        tags:
          - devices
        parameters:
          - name: mac_addr
            in: path
            type: string
            required: true
            description: MAC address of the device
          - name: name
            in: query
            type: string
            required: false
            description: Name of the device
          - name: isNew
            in: query
            type: boolean
            required: false
            description: Whether the device is new
        responses:
            200:
                description: Device updated successfully
            404:
                description: Device not found
            422:
                description: Name too long
        """

        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=False, help='Name of the device', location='args')
        parser.add_argument('isNew', type=lambda x: x.lower() == 'true', required=False,
                            help='Whether the device is new', location='args')
        args = parser.parse_args()

        if args["name"] and len(args["name"]) > 30:
            return {'status': 'error', 'message': 'Name too long'}, 422

        result = device_collection.update_one({'mac': mac_addr}, {'$set': args})

        logger.error(result)

        if result.matched_count == 0:
            return {'status': 'error', 'message': 'Device not found'}, 404

        return {'status': 'ok'}


class Protection(Resource):
    def post(self):
        """
        Enables or disables the DNS protection
        ---
        tags:
          - dns
        parameters:
          - name: enable
            in: query
            type: string
            required: true
        responses:
            200:
                description: Protection updated successfully
        """

        parser = reqparse.RequestParser()
        parser.add_argument('enable', type=lambda x: x.lower() == 'true', required=True, help='Enable or disable protection',
                            location='args')
        args = parser.parse_args()

        adg = Adg('localhost', port=8080, username='admin', password='password')

        if args['enable']:
            asyncio.run(adg.enable_protection())
        else:
            asyncio.run(adg.disable_protection())

        return {'status': 'ok'}


class DnsStats(Resource):
    def get(self):
        """
        Gets the DNS statistics
        ---
        tags:
          - dns
        responses:
            200:
                description: dns proxy stats
        """

        return asyncio.run(self.getStats())

    async def getStats(self):
        adg = Adg('localhost', port=8080, username='admin', password='password')
        stats = adg.stats
        summary = {
            "stats_period": await stats.period(),
            "dns_queries": await stats.dns_queries(),
            "blocked_percentage": await stats.blocked_percentage(),
            "active_rules": await adg.filtering.rules_count(allowlist=False)
        }
        return summary


class HealthCheck(Resource):
    def get(self):
        """
        Health check endpoint
        ---
        tags:
          - other
        responses:
            200:
                description: Health check response
        """
        return {'status': 'ok'}


class Debug(Resource):
    def get(self):
        """
        Debug endpoint
        ---
        tags:
          - other
        responses:
            200:
                description: Debug response
        """
        update_devices_with_scan_result(db, 'c40407a2-9fe5-48e0-bd2f-af7d02ea76fd')
        return {'status': 'ok'}

api.add_resource(Devices, '/devices')
api.add_resource(StartDiscovery, '/start_discovery')
api.add_resource(Scans, '/scans')
api.add_resource(ScanResult, '/scan_result/<string:scan_id>')
api.add_resource(UpdateDevice, '/device/<string:mac_addr>/update')

api.add_resource(Protection, '/protection')
api.add_resource(DnsStats, '/dns_stats')

api.add_resource(Debug, '/debug')

api.add_resource(HealthCheck, '/health_check')

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
