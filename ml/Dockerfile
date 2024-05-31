FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    gcc \
    python3-dev \
    curl \
    tcpdump \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip

COPY requirements.txt /app/

RUN pip install -r requirements.txt

COPY . /app

COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

ENV FLASK_APP=app.py
ENV FLASK_ENV=production

EXPOSE 5000

ENTRYPOINT ["/app/start.sh"]