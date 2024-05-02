FROM python:3.9.10-alpine
COPY ./requirements.txt /srv/requirements.txt
WORKDIR /srv
RUN apk add --no-cache build-base libffi-dev openssl-dev curl krb5-dev linux-headers zeromq-dev nmap nmap-scripts
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
COPY . /srv

CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
#CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "5000"]
#ENTRYPOINT [ "python" ]
#CMD ["app.py" ]