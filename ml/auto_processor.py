import os
import time
import requests
import subprocess
import logging
import uuid
import shutil
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(message)s")
logger = logging.getLogger(__name__)

logger.info("Starting auto_processor.py")

class PcapFileHandler(FileSystemEventHandler):
    def __init__(self, upload_dir, split_dir, processed_dir, endpoint_url):
        self.upload_dir = upload_dir
        self.split_dir = split_dir
        self.processed_dir = processed_dir
        self.endpoint_url = endpoint_url
    
    def on_created(self, event):
        logger.info(f"Event detected: {event}")
        if event.is_directory:
            logger.info("Directory created, skipping.")
            return
        if event.src_path.endswith(".pcap"):
            logger.info(f"PCAP file detected: {event.src_path}")
            self.process_pcap_file(event.src_path)
        else:
            logger.info(f"File created but not a PCAP file: {event.src_path}")
    
    def process_pcap_file(self, file_path):
        logger.info(f"Processing file: {file_path}")
        try:
            scan_id = str(uuid.uuid4())
            split_directory = os.path.join(self.split_dir, scan_id)
            os.makedirs(split_directory, exist_ok=True)
            os.chmod(split_directory, 0o777)
            
            subprocess.run(["tcpdump", "-r", file_path, "-w", f"{split_directory}/split.pcap", "-C", "10"])
            
            for split_file in os.listdir(split_directory):
                split_file_path = os.path.join(split_directory, split_file)
                self.send_file_to_predict(split_file_path)
            
            processed_file_path = os.path.join(self.processed_dir, os.path.basename(file_path))
            shutil.move(file_path, processed_file_path)
        except Exception as e:
            logger.exception(f"Error processing PCAP file: {e}")
    
    def send_file_to_predict(self, file_path):
        try:
            files = {"file": open(file_path, "rb")}
            response = requests.post(self.endpoint_url, files=files)
            if response.status_code == 202:
                logger.info(f"File {file_path} processed successfully")
            else:
                logger.error(f"Failed to send file {file_path} for prediction: {response.content}")
        except Exception as e:
            logger.exception(f"Error sending file for prediction: {e}")

def create_directories(directories):
    for directory in directories:
        if not os.path.exists(directory):
            os.makedirs(directory)
            os.chmod(directory, 0o777)
        logger.info(f"Directory {directory} exists or created.")

def monitor_directory(upload_dir, split_dir, processed_dir, endpoint_url):
    event_handler = PcapFileHandler(upload_dir, split_dir, processed_dir, endpoint_url)
    observer = Observer()
    observer.schedule(event_handler, upload_dir, recursive=False)
    observer.start()
    logger.info(f"Started monitoring directory: {upload_dir}")
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()

if __name__ == "__main__":
    upload_dir = "uploads"
    split_dir = "split_temp"
    processed_dir = "processed"
    endpoint_url = "http://localhost:5000/predict"
    
    create_directories([upload_dir, split_dir, processed_dir])
    monitor_directory(upload_dir, split_dir, processed_dir, endpoint_url)
