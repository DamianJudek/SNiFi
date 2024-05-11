# SNiFi: Binary classification of network attacks using CICIoT2023 dataset

## Overview
This section of the SNiFi project focuses on developing a machine learning model to classify network traffic as either 'Attack' or 'Non-Attack'. The model utilizes the comprehensive CICIoT2023 dataset, which provides extensive data on IoT network interactions.

## Objective
The primary objective of this ML project is to accurately predict potential security threats in network traffic, enhancing the capability of IoT security systems to preemptively counteract these threats.

## How to run
This project uses Poetry for dependency management. Follow these steps to set up and run the project:
1. **Installation**:
   - Ensure you have Python 3.11 installed on your machine.
   - Install Poetry if it's not already installed:
     ```bash
     curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python -
     ```

2. **Setup**:
   - Navigate to the project directory and install dependencies using Poetry:
     ```bash
     poetry install
     ```

3. **Running the Model**:
   - Activate the Poetry environment:
     ```bash
     poetry shell
     ```
   - Run the model script (replace `run_model.py` with your actual script):
     ```bash
     python run_model.py
     ```

---

*Citation: E. C. P. Neto, S. Dadkhah, R. Ferreira, A. Zohourian, R. Lu, A. A. Ghorbani. "[CICIoT2023: A real-time dataset and benchmark for large-scale attacks in IoT environment](https://www.mdpi.com/1424-8220/23/13/5941)," Sensor (2023) – (submitted to Journal of Sensors).*

---