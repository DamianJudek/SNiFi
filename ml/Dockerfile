FROM python:3.11-slim
WORKDIR /app
COPY pyproject.toml poetry.lock* /app/
RUN apt-get update && apt-get install -y \ 
    curl \
    tcpdump \
    && curl -sSL https://install.python-poetry.org | python3 - \
    && rm -rf /var/lib/apt/lists/*
ENV PATH="/root/.local/bin:$PATH"
RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi
COPY . /app
EXPOSE 5000

CMD ["poetry", "run", "python", "app.py"]