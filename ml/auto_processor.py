import os
import time
import requests
import logging
import subprocess
from queue import Queue
from threading import Thread
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(message)s")
logger = logging.getLogger(__name__)

logger.info("Starting auto_processor.py")

class PcapFileHandler(FileSystemEventHandler):
    def __init__(self, upload_dir, split_dir, queue):
        self.upload_dir = upload_dir
        self.split_dir = split_dir
        self.queue = queue
    
    def on_created(self, event):
        logger.info(f"Event detected: {event}")
        if event.is_directory:
            logger.info("Directory created, skipping.")
            return
        if event.src_path.endswith(".pcap"):
            logger.info(f"PCAP file detected: {event.src_path}")
            time.sleep(10)
            self.split_pcap_file(event.src_path)
        else:
            logger.info(f"File created but not a PCAP file: {event.src_path}")

    def split_pcap_file(self, file_path):
        try:
            scan_id = os.path.basename(file_path).split('.')[0]
            split_output_dir = os.path.join(self.split_dir, scan_id)
            os.makedirs(split_output_dir, exist_ok=True)
            os.chmod(split_output_dir, 0o777)
            logger.info(f"Splitting file: {file_path} into {split_output_dir}")

            subprocess.run(['tcpdump', '-r', file_path, '-w', os.path.join(split_output_dir, 'split'), '-C', '10'], check=True)
            
            split_files = os.listdir(split_output_dir)
            logger.info(f"Split files: {split_files}")
            if not split_files:
                logger.error("No split files generated.")
                return
            
            for split_file in split_files:
                split_file_path = os.path.join(split_output_dir, split_file)
                self.queue.put(split_file_path)
                logger.info(f"File {split_file_path} added to the queue for processing")
        except Exception as e:
            logger.exception(f"Error splitting PCAP file: {e}")

def file_processor(queue, endpoint_url):
    while True:
        file_path = queue.get()
        if file_path is None:
            break
        try:
            logger.info(f"Processing file from queue: {file_path}")
            with open(file_path, "rb") as file:
                files = {"file": file}
                response = requests.post(endpoint_url, files=files)
                if response.status_code == 202:
                    logger.info(f"File {file_path} processed successfully")
                else:
                    logger.error(f"Failed to send file {file_path} for prediction: {response.status_code} - {response.content}")
        except Exception as e:
            logger.exception(f"Error sending file for prediction: {e}")
        finally:
            queue.task_done()

def monitor_directory(upload_dir, endpoint_url, split_dir):
    queue = Queue()
    event_handler = PcapFileHandler(upload_dir, split_dir, queue)
    observer = Observer()
    observer.schedule(event_handler, upload_dir, recursive=False)
    observer.start()
    logger.info(f"Started monitoring directory: {upload_dir}")
    
    worker = Thread(target=file_processor, args=(queue, endpoint_url))
    worker.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
    queue.put(None)
    worker.join()

if __name__ == "__main__":
    upload_dir = "uploads/auto"
    split_dir = "split_temp"
    endpoint_url = "http://localhost:5000/predict"
    
    monitor_directory(upload_dir, endpoint_url, split_dir)