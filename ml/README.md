# A binary classification model of IoT network attacks for SNiFi trained on CICIoT2023 dataset

The ML part of the project focuses on developing a machine learning model to classify network traffic as either 'Attack' or 'Benign'. The model utilizes the comprehensive CICIoT2023 dataset, which provides extensive data on IoT network behavior.

## How to run
> **Note**: To correctly pull the machine learning models located at `models/`, Git Large File Storage (Git LFS) is required. Please install Git LFS by following the [installation instructions](https://docs.github.com/en/repositories/working-with-files/managing-large-files/installing-git-large-file-storage). After cloning the repository, navigate to the main project directory and run the following commands:
> ```bash
> git lfs install
> git lfs pull
> ```

Initially, this project used Poetry for dependency management. However, due to compatibility issues on macOS, we transitioned to using a `requirements.txt` file for setting up the Docker container. Follow these steps to set up and run the project:
### Using Docker Compose
The recommended way of running the ML component is with Docker Compose, ensuring that all dependencies are correctly installed and the environment is properly set up.
* To start the ML component with the entire application stack using Docker Compose:

    ```bash
    docker compose up -d
    ```

* To run only the ML component:

    ```bash
    docker compose up ml -d
    ```

### Running Locally

If you prefer not to use Docker Compose, you can still set up and run the project locally. Ensure you have Python 3.11 installed on your machine.

1. **Installation**:
   - Install Poetry if it's not already installed:
     ```bash
     curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python -
     ```

2. **Setup**:
   - Navigate to the project directory and install dependencies using Poetry:
     ```bash
     poetry install
     ```
   - Alternatively, install dependencies using `requirements.txt`:
     ```bash
     pip install -r requirements.txt
     ```

3. **Running the Model**:
   - If using Poetry, activate the environment:
     ```bash
     poetry shell
     ```
   - Run the model script:
     ```bash
     python train_smote.py
     ```

### Running in Docker

* Build the Docker image:
    ```bash
    docker image build -t snifi-ml .
    ```

* Start the Docker container:
    ```bash
    docker run -d -p 5000:5000 snifi-ml
    ```

## Model API

The trained model, characterized by the best prediction results, is wrapped in a Flask API and packaged in a Dockerfile. This allows for easy deployment and integration with other components of the SNiFi project.

* To run the Flask API server, use the following command (after building the Docker image):
    ```bash
    docker run -d -p 5000:5000 snifi-ml
    ```
---

*Citation: E. C. P. Neto, S. Dadkhah, R. Ferreira, A. Zohourian, R. Lu, A. A. Ghorbani. "[CICIoT2023: A real-time dataset and benchmark for large-scale attacks in IoT environment](https://www.mdpi.com/1424-8220/23/13/5941)," Sensor (2023) – (submitted to Journal of Sensors).*

---
