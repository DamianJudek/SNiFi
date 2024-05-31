import os
import uuid
import joblib
import logging
import pandas as pd
import threading

from flask import Flask, request, jsonify
from flask_cors import CORS
from flasgger import Swagger
from pymongo import MongoClient
from concurrent.futures import ThreadPoolExecutor
from dotenv import load_dotenv

from utils.feature_extraction import Feature_extraction

load_dotenv()

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format='%(asctime)s %(message)s')

app = Flask(__name__)
CORS(app)
swagger = Swagger(app, template={
    "info": {
        "title": "SNiFi ML API",
        "version": "1.0"
    },
    "tags": [
        {"name": "ml", "description": "Machine Learning endpoints"},
    ],
})

executor = ThreadPoolExecutor(max_workers=1)
lock = threading.Lock()

model_path = os.getenv("MODEL_PATH", "models/RF_model_v1.1.0.pkl")
columns_path = os.getenv("COLUMNS_PATH", "models/feature_columns.pkl")
scaler_path = os.getenv("SCALER_PATH", "models/scaler.pkl")
mongo_url = os.getenv("MONGO_URL", "mongodb://mongodb:27017/")

model = joblib.load(model_path)
feature_columns = joblib.load(columns_path)
scaler = joblib.load(scaler_path)

client = MongoClient(mongo_url)
db = client['snifi-db']
predictions_collection = db['predictions']
processing_status_collection = db['processing_status']

directories = ["uploads/processed", "uploads/auto", "processed", "split_temp", "output"]
for directory in directories:
    if not os.path.exists(directory):
        os.makedirs(directory)
        os.chmod(directory, 0o777)
    logger.info(f"Directory {directory} exists or created.")

def process_split_file(subfile_path, processed_file_path):
    feature_extractor = Feature_extraction()
    try:
        logger.info(f"Processing split file: {subfile_path}")
        feature_extractor.pcap_evaluation(subfile_path, processed_file_path)
        logger.info(f"Processed file saved as: {processed_file_path}")
    except Exception as e:
        logger.error(f"Exception in process_split_file: {e}")
        raise

def merge_csv_files(destination_directory, output_file_path):
    csv_subfiles = os.listdir(destination_directory)
    mode = 'w'
    for f in csv_subfiles:
        try:
            d = pd.read_csv(os.path.join(destination_directory, f))
            d.to_csv(output_file_path, header=(mode == 'w'), index=False, mode=mode)
            mode = 'a'
        except Exception as e:
            logger.error(f"Error merging CSV file {f}: {e}")

def process_pcap(file_path, scan_id):
    try:
        logger.info(f"Processing PCAP file: {file_path}")
        processing_status_collection.update_one({"scanId": scan_id}, {"$set": {"status": "processing"}})

        processed_dir = "processed"
        if not os.path.exists(processed_dir):
            os.makedirs(processed_dir)
            os.chmod(processed_dir, 0o777)
        
        processed_file_path = os.path.join(processed_dir, os.path.basename(file_path))
        
        feature_extractor = Feature_extraction()
        logger.info(f"Extracting features from: {file_path} to: {processed_file_path}")
        feature_extractor.pcap_evaluation(file_path, processed_file_path)

        full_processed_file_path = processed_file_path + ".csv"
        if not os.path.exists(full_processed_file_path):
            raise Exception(f"Processed file {full_processed_file_path} not found.")

        logger.info(f"Processed file {full_processed_file_path} successfully created.")
        
        processing_status_collection.update_one({"scanId": scan_id}, {"$set": {"status": "processed"}})
        submit_for_prediction(full_processed_file_path, scan_id)
        
        os.remove(file_path)
        logger.info(f"Removed file: {file_path}")
    except Exception as e:
        logger.exception(f"Error processing PCAP file: {e}")
        processing_status_collection.update_one({"scanId": scan_id}, {"$set": {"status": "error", "error": str(e)}})

def submit_for_prediction(processed_file_path, scan_id):
    label_mapping = {0: "Benign", 1: "Attack"}
    try:
        logger.info(f"Submitting for prediction: {processed_file_path}")
        data = pd.read_csv(processed_file_path)
        if not set(feature_columns).issubset(data.columns):
            error_msg = "Extracted features CSV file is missing required columns"
            logger.error(error_msg)
            processing_status_collection.update_one({"scanId": scan_id}, {"$set": {"status": "error", "error": error_msg}})
            return

        data[feature_columns] = scaler.transform(data[feature_columns])

        predictions = model.predict(data[feature_columns]) # make predictions
        confidence_levels = model.predict_proba(data[feature_columns]) # get confidence levels for each class
        confidence_for_class = confidence_levels.max(axis=1)

        attack_predictions = sum(predictions)
        benign_predictions = len(predictions) - attack_predictions

        attack_ratio = attack_predictions / len(predictions) # calculate the ratio of 'Attack' predictions to total predictions
        average_confidence_attack = confidence_levels[predictions == 1, 1].mean() if attack_predictions > 0 else 0 # calculate the average confidence level for 'Attack' predictions
        average_confidence_benign = confidence_levels[predictions == 0, 0].mean() if benign_predictions > 0 else 0 # calculate the average confidence level for 'Benign' predictions

        decision_threshold = 0.6

        final_decision = "Attack" if attack_ratio > decision_threshold and average_confidence_attack > 0.7 else "Benign" # final decision based on attack ratio and average confidence level

        prediction_data = {
            "scanId": scan_id,
            "finalDecision": final_decision,
            "attackRatio": attack_ratio,
            "averageConfidenceAttack": average_confidence_attack,
            "averageConfidenceBenign": average_confidence_benign,
            "totalPredictions": len(predictions)
        }
        predictions_collection.insert_one(prediction_data)
        logger.info(f"Predictions saved for scan_id: {scan_id}")
        
        del data
    except Exception as e:
        logger.exception(f"Error in prediction: {e}")
        processing_status_collection.update_one({"scanId": scan_id}, {"$set": {"status": "error", "error": str(e)}})
    finally:
        if os.path.exists(processed_file_path):
            os.remove(processed_file_path)
            logger.info(f"Removed processed file: {processed_file_path}")

@app.route('/predict', methods=['POST'])
def predict():
    """
    Predicts the class of a PCAP file
    ---
    tags:
      - ml
    consumes:
      - multipart/form-data
    parameters:
      - name: file
        in: formData
        type: file
        required: true
        description: The PCAP file to be processed
    responses:
      202:
        description: Prediction initiated successfully
      400:
        description: Invalid input
      500:
        description: Internal server error
    """
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    file_path = os.path.join("uploads/processed", file.filename)
    file.save(file_path)

    if not os.path.exists(file_path):
        return jsonify({"error": "File not saved"}), 500

    scan_id = str(uuid.uuid4())
    processing_status_collection.insert_one({"scanId": scan_id, "status": "uploaded", "file_name": file.filename})

    executor.submit(process_pcap, file_path, scan_id)

    return jsonify({"scanId": scan_id}), 202

@app.route('/predictions', methods=['GET'])
def get_predictions():
    """
    Gets a list of all predictions
    ---
    tags:
      - ml
    responses:
      200:
        description: List of predictions
    """
    cursor = predictions_collection.find()
    predictions = list(cursor)
    for prediction in predictions:
        prediction['_id'] = str(prediction['_id'])
    return jsonify(predictions), 200

@app.route('/predict/<string:scan_id>', methods=['GET'])
def get_status(scan_id):
    """
    Gets the status of a scan
    ---
    tags:
      - ml
    parameters:
      - name: scan_id
        in: path
        type: string
        required: true
        description: Scan ID
    responses:
      200:
        description: Scan status
      404:
        description: Scan not found
    """
    status = processing_status_collection.find_one({"scanId": scan_id}, {"_id": False})
    if not status:
        return jsonify({"error": "Scan not found"}), 404
    in_progress = status["status"] == "processing"
    return jsonify({"scanId": scan_id, "inProgress": in_progress, "status": status["status"]}), 200

@app.route('/predict/result/<string:scan_id>', methods=['GET'])
def get_result(scan_id):
    """
    Gets the result of a scan
    ---
    tags:
      - ml
    parameters:
      - name: scan_id
        in: path
        type: string
        required: true
        description: Scan ID
    responses:
      200:
        description: Scan result
      404:
        description: Scan not found
    """
    result = predictions_collection.find_one({"scanId": scan_id}, {"_id": False})
    if not result:
        return jsonify({"error": "Scan not found"}), 404
    return jsonify(result), 200

@app.route('/health_check', methods=['GET'])
def health_check():
    """
    Health check endpoint
    ---
    tags:
      - ml
    responses:
      200:
        description: API is running
    """
    return jsonify({"status": "ok"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)