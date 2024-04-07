FROM python:3.9.10-alpine
COPY ./requirements.txt /srv/requirements.txt
WORKDIR /srv
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
COPY . /srv
ENTRYPOINT [ "python" ]
CMD ["app.py" ]