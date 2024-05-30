FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt /app/

RUN apt-get update && apt-get install -y \
    gcc \
    python3-dev \
    curl \
    tcpdump \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip \
    && pip install -r requirements.txt

COPY . /app

ENV FLASK_APP=app.py
ENV FLASK_ENV=production

EXPOSE 5000

COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

CMD ["sh", "/app/start.sh"]
# CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app", "--reload"]
# CMD ["sh", "-c", "gunicorn -b 0.0.0.0:5000 app:app --reload & python auto_processor.py"]
