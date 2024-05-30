import asyncio
import logging
from datetime import datetime

from adguardhome import AdGuardHome as Adg
from pymongo.database import Database

logger = logging.getLogger('adg_report_worker')


def check_blocked_queries(db: Database):
    misc_collection = db['misc']
    notification_collection = db['notifications']
    config = misc_collection.find_one({'type': 'blocked_queries'})
    if config:
        since = config['value']['lastBlockedQuery']
    else:
        since = "1970-01-01T00:00:00.000000000Z"

    logger.info('Checking blocked queries')
    response = asyncio.run(get_recent_blocked_queries())['data']

    should_update = True
    for query in response:
        if parse_time(query['time']) <= parse_time(since):
            logger.info('No new blocked queries')
            break
        logger.info('New blocked query found: ' + query['question']['name'])

        notification_collection.insert_one(
            {
                'type': 'blocked_query',
                'severity': 5,
                'query': query['question']['name'],
                'seen': False,
                'timestamp': str(parse_time(query['time']))
            }
        )

        if should_update:
            should_update = False
            misc_collection.update_one({
                'type': 'blocked_queries',
            }, {
                '$set': {
                    'value': {
                        'lastBlockedQuery': query['time']
                    }
                }
            }, upsert=True)


async def get_recent_blocked_queries():
    adg = Adg('localhost', port=8080, username='admin', password='password')
    response = await adg.request('querylog', params={'response_status': 'blocked'})
    await adg.close()
    return response


def parse_time(timestamp_str: str):
    timestamp_str_micro = timestamp_str[:-4] + "Z"
    return datetime.strptime(timestamp_str_micro, "%Y-%m-%dT%H:%M:%S.%fZ")


if __name__ == "__main__":
    print(parse_time("2024-05-30T19:47:14.770879873Z"))
