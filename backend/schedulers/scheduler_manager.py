import logging

from apscheduler.schedulers.background import BackgroundScheduler
from pymongo.database import Database

from schedulers.adg_report_worker import check_blocked_queries

logger = logging.getLogger('scheduler_manager')


def init_schedulers(db: Database):
    logger.debug("Initializing schedulers")
    scheduler = BackgroundScheduler()
    scheduler.add_job(check_blocked_queries, 'interval', seconds=10, args=[db])
    scheduler.start()
    logger.debug("Schedulers started")
