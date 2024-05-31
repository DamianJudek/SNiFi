# A backend server for SNiFi built on Flask.

SNiFi backend is threat detection system designed for small networks. It's built with flexible Flask framework and provides an API to be used with frontend or other integrations.

## Recommended way of running the backend server is with Docker Compose.

Major benefit of running development server in docker is a hot reload feature. You can make changes to the code and they will be applied immediately without the need to rebuild the app or restart container.

* You can start backend with whole application stack using docker compose.

    ```bash
    docker compose up -d
    ```

* However, you can run a command to start just the backend server (with MongoDB service).

    ```bash
    docker compose up backend -d
    ```

## If you wish not to use docker compose:

Note: Backend server is dependant on MongoDB database. Make sure you have a running MongoDB instance. You can use mongo server installed locally or with standalone docker container.

* Make sure you are in /backend directory

    ```bash
    cd backend
    ```

* There are two ways to run the backend server 
  * With local environment
  * With Docker container.

### 1. Local development

* Create a virtual environment:

    ```bash
    python3 -m venv ./
    ```

* Activate venv

    ```bash
    source .venv/bin/activate
    ```

* Install requirements

    ```bash
    pip install -r requirements.txt
    ```

* Start app

    ```bash
    flask --app App run
    ```

### 2. Running in Docker

* build container

    ```bash
    docker image build -t backend . 
    ```

* start docker

    ```bash
    docker run -p 5000:5000 -d backend 
    ```