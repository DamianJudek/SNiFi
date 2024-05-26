import os
import pandas as pd
from tqdm import tqdm
from sklearn.preprocessing import StandardScaler

class DataLoader:
    def __init__(self, dataset_directory):
        self.dataset_directory = dataset_directory

    def load_datasets(self):
        df_sets = [k for k in os.listdir(self.dataset_directory) if k.endswith('.csv')]
        df_sets.sort()
        return df_sets

    def load_data(self, file_list):
        data_frames = []
        for file in tqdm(file_list):
            df = pd.read_csv(os.path.join(self.dataset_directory, file))
            data_frames.append(df)
        return pd.concat(data_frames, ignore_index=True)


class Preprocessor:
    def __init__(self, X_columns, y_column, class_mapping=None):
        self.scaler = StandardScaler()
        self.X_columns = X_columns
        self.y_column = y_column
        self.class_mapping = class_mapping

    def fit_scaler(self, data):
        self.scaler.fit(data[self.X_columns])

    def transform_data(self, data):
        data[self.X_columns] = self.scaler.transform(data[self.X_columns])
        if self.class_mapping is not None:
            data[self.y_column] = data[self.y_column].map(self.class_mapping)
        return data
    
    def fit_transform(self, data):
        self.fit_scaler(data)
        return self.transform_data(data)