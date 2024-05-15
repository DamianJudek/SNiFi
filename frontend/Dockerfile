FROM node:22-alpine
COPY ./package.json /srv/package.json
WORKDIR /srv
RUN npm install

COPY . /srv

CMD [ "npm", "run", "serve"]
