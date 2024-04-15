import json
import os
import uuid
from concurrent.futures import Executor, ThreadPoolExecutor
from datetime import datetime

from flasgger import Swagger
from flask import Flask, jsonify
from flask_restful import Api, Resource
from pymongo import MongoClient
from daemon.nmap_daemon import subnet_quickscan

app = Flask(__name__)
api = Api(app)
swagger = Swagger(app)

executor = ThreadPoolExecutor(max_workers=4)

#TODO add condition to check if app is running in docker container or in local environment and change the host accordingly
client = MongoClient('mongodb://mongodb:27017/')
db = client['snifi-db']
scan_status_collection = db['scan_status']
scan_result_collection = db['scan_result']


class StartScan(Resource):
    def post(self):
        """
        Starts a nmap scan of the network
        """

        uid = str(uuid.uuid4())

        print(f'Starting scan with id: {uid}')

        executor.submit(self.start_scan, uid)

        return {'status': 'success', 'scanId': uid}

    def start_scan(self, uid: str):
        print(f'Scan {uid} started')

        scan_status_collection.insert_one(
            {'startTime': str(datetime.now()), 'scanId': uid, 'status': 'running', 'endTime': None}
        )

        scan_result = subnet_quickscan()

        scan_result_collection.insert_one({'scanId': uid, 'scanResult': scan_result})

        scan_status_collection.update_one(
            {'scanId': uid},
            {'$set': {'status': 'completed', 'endTime': str(datetime.now())}}
        )

        print(f'Scan {uid} completed')


class GetRunningScans(Resource):
    def get(self):
        """
        Gets a list of all running scans
        """

        running_scans = list(scan_status_collection.find({'status': 'running'}, {'_id': False}))
        print(running_scans)
        print(datetime.now())
        return running_scans


class GetScanResult(Resource):
    def get(self, scan_id):
        """
        Gets the result of a scan
        """

        scan_result = scan_result_collection.find_one({'scanId': scan_id}, {'_id': False})

        return scan_result


class MockScan(Resource):
    def get(self):
        scan_status_collection.insert_one(
            {'startTime': str(datetime.now()), 'scanId': '1', 'status': 'running', 'endTime': None}
        )
        return {'status': 'success', 'scanId': '0'}


api.add_resource(StartScan, '/start_scan')
api.add_resource(GetRunningScans, '/running_scans')
api.add_resource(GetScanResult, '/scan_result/<string:scan_id>')
api.add_resource(MockScan, '/mock_scan')

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
