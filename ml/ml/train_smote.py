import os
import sys
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, recall_score, precision_score, f1_score, confusion_matrix, ConfusionMatrixDisplay
from imblearn.over_sampling import SMOTE
from collections import Counter
import joblib
from tqdm import tqdm
import logging
from concurrent.futures import ProcessPoolExecutor
import matplotlib.pyplot as plt

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

sys.path.append(os.path.abspath(os.path.join(os.getcwd(), '..')))

from ml.data_handling import DataLoader, Preprocessor
from config import load_config

config_path = os.path.join(os.path.dirname(__file__), '..', 'config', 'config.yaml')
config_path = os.path.abspath(config_path)
config = load_config(config_path)

DATASET_DIRECTORY = config['dataset_directory']
MODEL_PATH = config['model_path']
RANDOM_STATE = config['random_state']
X_columns = config['X_columns']
y_column = config['y_column']
class_mapping = config['class_mapping']

def process_file(file, preprocessor):
    df = pd.read_csv(os.path.join(DATASET_DIRECTORY, file))
    df = preprocessor.transform_data(df)
    return df

def load_and_preprocess_data(file_list, preprocessor, max_workers=4):
    with ProcessPoolExecutor(max_workers=max_workers) as executor:
        futures = [executor.submit(process_file, file, preprocessor) for file in file_list]
        data_frames = [f.result() for f in tqdm(futures, total=len(file_list))]
    return pd.concat(data_frames, ignore_index=True)

logger.info("LOADING DATASETS...")
data_loader = DataLoader(DATASET_DIRECTORY)
df_sets = data_loader.load_datasets()

logger.info("PREPROCESSING DATA...")
df_sample = pd.concat([pd.read_csv(os.path.join(DATASET_DIRECTORY, file)) for file in df_sets[:5]])

preprocessor = Preprocessor(X_columns, y_column, class_mapping)
preprocessor.fit_scaler(df_sample)

forest = RandomForestClassifier(n_estimators=150, random_state=RANDOM_STATE, n_jobs=-1)
smote = SMOTE(random_state=RANDOM_STATE)

batch_size = 10
for batch_start in range(0, len(df_sets), batch_size):
    batch_end = min(batch_start + batch_size, len(df_sets))
    batch_files = df_sets[batch_start:batch_end]
    
    logger.info(f"PROCESSING BATCH {batch_start // batch_size + 1}...")
    batch_data = load_and_preprocess_data(batch_files, preprocessor)
    
    X = batch_data[X_columns]
    y = batch_data[y_column]
    y = y.map({'Benign': 0, 'Attack': 1})
    
    X_resampled, y_resampled = smote.fit_resample(X, y)
    
    forest.fit(X_resampled, y_resampled)

logger.info("SAVING MODEL...")
joblib.dump(forest, MODEL_PATH)

logger.info("EVALUATING MODEL")
test_files = df_sets[int(len(df_sets) * .8):]
test_data = load_and_preprocess_data(test_files, preprocessor)

X_test = test_data[X_columns]
y_test = test_data[y_column]
y_test = y_test.map({'Benign': 0, 'Attack': 1})

y_pred = forest.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)
recall = recall_score(y_test, y_pred, average='macro')
precision = precision_score(y_test, y_pred, average='macro')
f1 = f1_score(y_test, y_pred, average='macro')

logger.info('##### Random Forest with SMOTE (2 classes) #####')
logger.info('accuracy_score: %s', accuracy)
logger.info('recall_score: %s', recall)
logger.info('precision_score: %s', precision)
logger.info('f1_score: %s', f1)

class_counts = Counter(y_test)
logger.info("CALCULATING CLASS IMBALANCE...")
logger.info("##### Class Imbalance (Attack vs Benign) #####")
for label, count in class_counts.items():
    logger.info(f"{label}: {count}")

logger.info("CREATING CONFUSION MATRIX...")
logger.info("##### Confusion Matrix #####")
print(confusion_matrix(y_test, y_pred))

ConfusionMatrixDisplay.from_estimator(forest, X_test, y_test, display_labels=['Benign', 'Attack'], cmap='Greens')
plt.title('SMOTE + Random Forest Confusion Matrix')
plt.savefig('confusion_matrix_RF_v1.0.1_SMOTE.png')
plt.show()