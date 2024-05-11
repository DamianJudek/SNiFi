import logging

from pymongo import MongoClient
from pymongo.collection import Collection
from pymongo.database import Database

HISTORICAL_SCAN_RETENTION = 30

logger = logging.getLogger('device_daemon')


def update_devices_with_scan_result(db: Database, scanId: str):
    logger.info(f'Updating devices collection after {scanId} scan result')

    devices_collection = db['devices']
    previous_devices = devices_collection.find({})
    previous_devices_macs = [device['mac'] for device in previous_devices]

    scan = db['scan_result'].find_one({'scanId': scanId}, {'_id': False})

    for device in scan['result']:
        if device['mac'] not in previous_devices_macs:
            new_device_detected(devices_collection, device['ip'], device['mac'], scanId, scan['timestamp'])
        else:
            update_existing_device(devices_collection, device['ip'], device['mac'], scanId, scan['timestamp'])

    current_devices_macs = [device['mac'] for device in scan['result']]
    for device in previous_devices:
        if device['mac'] not in current_devices_macs:
            update_existing_device(devices_collection, device['ip'], device['mac'], scanId, scan['timestamp'], available=False)
            logger.debug(f'Device {device["mac"]} not found in scan {scanId}, updating availability')

    logger.info('Devices collection updated')


def new_device_detected(devices_collection: Collection, ip: str, mac: str, scanId: str, timestamp: str):
    logger.info(f'New device detected: {ip}, {mac}')

    devices_collection.insert_one(
        {
            'mac': mac,
            'name': None,
            'ip': ip,
            'isNew': True,
            'isBlocked': False,
            'discoveredAt': timestamp,
            'availability': [
                {
                    'scanId': scanId,
                    'timestamp': timestamp,
                    'available': True
                }
            ]
        }
    )


def update_existing_device(devices_collection: Collection, ip: str, mac: str, scanId: str, timestamp: str, available: bool = True):
    devices_collection.update_one(
        {'mac': mac},
        {
            '$set': {
                'ip': ip
            },
            '$push': {
                'availability': {
                    '$each': [
                        {
                            'scanId': scanId,
                            'timestamp': timestamp,
                            'available': available
                        }
                    ],
                    '$slice': -HISTORICAL_SCAN_RETENTION
                }
            }
        }
    )


if __name__ == "__main__":
    mongo_url = 'mongodb://localhost:27017/'

    client = MongoClient(mongo_url)
    db = client['snifi-db']

    update_devices_with_scan_result(db, 'scanId')
