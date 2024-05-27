import yaml
import os

def load_config(config_path='config/config.yaml'):
    with open(config_path, 'r') as file:
        config = yaml.safe_load(file)
    
    config_dir = os.path.dirname(os.path.abspath(config_path))
    
    config['dataset_directory'] = os.path.abspath(os.path.join(config_dir, config['dataset_directory']))
    config['model_path'] = os.path.abspath(os.path.join(config_dir, config['model_path']))
    
    return config