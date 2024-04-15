FROM python:3.9.10-alpine
COPY ./requirements.txt /srv/requirements.txt
WORKDIR /srv
RUN apk add --no-cache build-base libffi-dev openssl-dev curl krb5-dev linux-headers zeromq-dev
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
COPY . /srv
ENTRYPOINT [ "python" ]
CMD ["app.py" ]