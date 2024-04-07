# A backend server for SNiFi built on Flask.

SNiFi is a simple threat detection system designed for small networks. It's built with Flask and provides an API to be used with frontend or other integrations.

## How to get started:

* Make sure you are in /backend directory

```bash
cd backend
```



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
docker image build -t snifi . 
```

* start docker
```bash
docker run -p 5000:5000 -d snifi 
```