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

mongo_url = 'mongodb://mongodb:27017/' if os.environ.get('RUNNING_IN_DOCKER') else 'mongodb://localhost:27017/'

client = MongoClient(mongo_url)
db = client['snifi-db']
scan_status_collection = db['scan_status']
scan_result_collection = db['scan_result']


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

        print(f'Starting scan with id: {uid}')

        executor.submit(self.start_scan, uid)

        return {'scanId': uid}

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


class GetAllScans(Resource):
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
        print(all_scans)
        print(datetime.now())
        return all_scans


class GetScanResult(Resource):
    def get(self, scan_id):
        """
        Gets the result of a scan
        """

        scan_result = scan_result_collection.find_one({'scanId': scan_id}, {'_id': False})

        return scan_result


class MockScan(Resource):
    def get(self, id: str):
        scan_status_collection.insert_one(
            {'startTime': str(datetime.now()), 'scanId': id, 'status': 'running', 'endTime': None}
        )
        return {'status': 'success', 'scanId': id}


class UpdateScan(Resource):
    def post(self, id: str):
        scan_status_collection.update_one(
            {'scanId': id},
            {'$set': {'status': 'completed', 'endTime': str(datetime.now())}}
        )
        return {'status': 'success'}


class DeleteAllScans(Resource):
    def delete(self):
        scan_status_collection.delete_many({})
        scan_result_collection.delete_many({})
        return {'status': 'success'}


api.add_resource(StartScan, '/start_scan')
api.add_resource(GetRunningScans, '/running_scans')
api.add_resource(GetAllScans, '/all_scans')
api.add_resource(GetScanResult, '/scan_result/<string:scan_id>')
api.add_resource(MockScan, '/mock_scan/<string:id>')
api.add_resource(UpdateScan, '/update_scan/<string:id>')
api.add_resource(DeleteAllScans, '/delete_all_scans')

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
