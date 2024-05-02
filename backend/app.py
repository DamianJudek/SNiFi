import logging
import os
import uuid
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime

from flasgger import Swagger
from flask import Flask
from flask_restful import Api, Resource
from nmap import PortScannerError
from pymongo import MongoClient

from util.iputil import get_default_gateway_ip
from daemon.device_daemon import update_devices_with_scan_result
from daemon.discovery_daemon import discovery_scan
from daemon.nmap_daemon import subnet_quickscan

logger = logging.getLogger(__name__)

app = Flask(__name__)
api = Api(app)
swagger = Swagger(app)

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
        Gets a list of all devices found on the network with their ping response.
        ---
        responses:
          200:
            description: List of devices
            schema:
              type: array
              items:
                type: object
                properties:
                  ip:
                    type: string
                    format: ipv4
                  mac:
                    type: string
                  vendor:
                    type: string
        """

        return list(device_collection.find({}, {'_id': False}))


class StartDiscovery(Resource):
    def post(self):
        """
        Starts a discovery scan of the network. Returns ips with associated mac addresses (host will not show up if mac address is not found)
        ---
        responses:
          200:
            description: Scan started successfully
            schema:
              properties:
                scanId:
                  type: string
                  format: uuid
                  description: Started scan id
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


class StartScan(Resource):
    def post(self):
        """
        Starts a nmap scan of the network
        ---
        responses:
          200:
            description: Scan started successfully
            schema:
              properties:
                scanId:
                  type: string
                  format: uuid
                  description: Started scan id
        """

        uid = str(uuid.uuid4())

        logger.info(f'Starting scan with id: {uid}')

        executor.submit(self.start_scan, uid)

        return {'scanId': uid}

    def start_scan(self, uid: str):
        logger.info(f'Scan {uid} started')

        scan_status_collection.insert_one(
            {'startTime': str(datetime.now()), 'scanId': uid, 'status': 'running', 'endTime': None, 'meta': None}
        )

        try:
            scan_result = subnet_quickscan()
        except PortScannerError as e:
            logger.exception(f'Scan {uid} failed')
            scan_status_collection.update_one(
                {'scanId': uid},
                {'$set': {'status': 'failed', 'endTime': str(datetime.now()), 'meta': e.value}}
            )

        scan_result_collection.insert_one({'scanId': uid, 'scanResult': scan_result})

        scan_status_collection.update_one(
            {'scanId': uid},
            {'$set': {'status': 'completed', 'endTime': str(datetime.now())}}
        )

        logger.info(f'Scan {uid} completed')


class GetRunningScans(Resource):
    def get(self):
        """
        Gets a list of all running scans
        ---
        responses:
          200:
            description: List of running scans
            schema:
              properties:
                scanId:
                  type: string
                  format: uuid
                  description: Running scan id
                startTime:
                  type: string
                  format: date-time
                status:
                  type: string
                  enum: [running, completed, failed]
                  example: running
                endTime:
                  type: string
                  format: date-time
                  nullable: true
                  example: null
        """

        running_scans = list(scan_status_collection.find({'status': 'running'}, {'_id': False}))
        return running_scans


class Scans(Resource):
    def get(self):
        """
        Gets a list of all scans
        ---
        responses:
          200:
            description: List of all scans
            schema:
              type: array
              items:
                type: object
                properties:
                  scanId:
                    type: string
                    format: uuid
                    description: Running scan id
                  startTime:
                    type: string
                    format: date-time
                  status:
                    type: string
                    enum: [running, completed, failed]
                    example: completed
                  endTime:
                    type: string
                    format: date-time
                    nullable: true
        """

        all_scans = list(scan_status_collection.find({}, {'_id': False}))
        return all_scans


class ScanResult(Resource):
    def get(self, scan_id):
        """
        Gets the result of a scan
        ---
        parameters:
          - name: scan_id
            in: path
            type: string
            required: true
            description: Scan id
        responses:
            200:
                description: Scan result
                schema:
                type: object
                properties:
                    scanId:
                        type: string
                        format: uuid
                        description: Running scan id
                    timestamp:
                        type: string
                        format: date-time
                    type:
                        type: string
                        enum: [discovery, nmap]
                        example: discovery
                    uphosts:
                        type: integer
                        example: 10
                    result:

        """

        scan_result = scan_result_collection.find_one({'scanId': scan_id}, {'_id': False})

        if scan_result is None:
            return {'error': 'Scan not found'}, 404

        return scan_result

class UpdateDevices(Resource):
    def post(self, scan_id: str):
        update_devices_with_scan_result(db, scan_id)
        return {'status': 'success'}


class HealthCheck(Resource):
    def get(self):
        return {'status': 'ok'}


api.add_resource(Devices, '/devices')
api.add_resource(StartDiscovery, '/start_discovery')
api.add_resource(Scans, '/scans')
api.add_resource(ScanResult, '/scan_result/<string:scan_id>')
api.add_resource(UpdateDevices, '/update_devices/<string:scan_id>')
api.add_resource(HealthCheck, '/health_check')

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
