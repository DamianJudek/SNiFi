import logging

from pymongo import MongoClient
from pymongo.collection import Collection
from pymongo.database import Database

HISTORICAL_SCAN_RETENTION = 30

logger = logging.getLogger('device_daemon')


def update_devices_with_scan_result(db: Database, scanId: str):
    logger.info(f'Updating devices collection after {scanId} scan result')

    devices_collection = db['devices']
    notifications_collection = db["notifications"]
    previous_devices = [device for device in devices_collection.find({})]
    previous_devices_macs = [device['mac'] for device in previous_devices]

    scan = db['scan_result'].find_one({'scanId': scanId}, {'_id': False})

    current_devices_macs = [device['mac'] for device in scan['result']]
    for device in previous_devices:
        if device['mac'] not in current_devices_macs:
            update_existing_device(devices_collection, notifications_collection, device['ip'], device['mac'], scanId, scan['timestamp'], available=False)
            logger.debug(f'Device {device["mac"]} not found in scan {scanId}, updating availability')

    for device in scan['result']:
        if device['mac'] not in previous_devices_macs:
            new_device_detected(devices_collection, notifications_collection, device['ip'], device['mac'], scanId, scan['timestamp'])
        else:
            update_existing_device(devices_collection, notifications_collection, device['ip'], device['mac'], scanId, scan['timestamp'])

    logger.info('Devices collection updated')


def new_device_detected(devices_collection: Collection, notifications_collection: Collection, ip: str, mac: str, scanId: str, timestamp: str):
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

    notifications_collection.insert_one(
        {
            'type': 'new_device',
            'severity': 3,
            'device': {
                'name': None,
                'mac': mac,
                'ip': ip
            },
            'scanId': scanId,
            'seen': False,
            'timestamp': timestamp
        }
    )


def update_existing_device(devices_collection: Collection, notifications_collection: Collection, ip: str, mac: str, scanId: str, timestamp: str, available: bool = True):
    device = devices_collection.find_one({'mac': mac})

    if available and device['ip'] != ip:
        logger.info(f'IP address of device {mac} changed from {device["ip"]} to {ip}')
        notifications_collection.insert_one(
            {
                'type': 'ip_change',
                'severity': 1,
                'device': {
                    'name': device['name'],
                    'mac': mac,
                    'ip': ip
                },
                'scanId': scanId,
                'seen': False,
                'timestamp': timestamp
            }
        )

    if device['availability'][-1]['available'] and not available:
        logger.info(f'Device {mac} went offline')
        notifications_collection.insert_one(
            {
                'type': 'device_offline',
                'severity': 2,
                'device': {
                    'name': device['name'],
                    'mac': mac,
                    'ip': ip
                },
                'scanId': scanId,
                'seen': False,
                'timestamp': timestamp
            }
        )

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
