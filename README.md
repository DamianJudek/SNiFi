# SNiFi

_Research and development project under the supervision of Dr. Tomasz Kowalski_


## Summary

**SNiFi** is a threat detection system designed specifically for home networks. It is designed with ease of use in mind, aiming to provide security without complex configuration or specialized technical knowledge. 

It utilizes Python with Flask for backend service, performing network scans and managing collected information. Along with MongoDB database it is a reliable solution for aggregating threat intelligence data. It exposes information with the use of REST API, which can be consumed by the frontend or other integrations.

The frontend is created with TypeScript and React, providing a user-friendly interface for easy system interaction and access to all important information at a glance. 

With flexibility and ease of deployment in mind, the whole application stack can be run with Docker Compose. This allows for quick and easy setup of the system without dependencies on the host system or configuration.

## Running

A recommended way of running the application is with Docker Compose. It will start the whole application stack with a single command. 

```bash
docker compose up --wait -d
```

You can also run individual services separately. To do so, reference README files in respective modules for more information about this process.

## Main open source projects used

### Frontend
* [React](https://github.com/facebook/react)
* [Styled Components](https://github.com/styled-components/styled-components)
* [Material-UI](https://github.com/mui-org/material-ui)

### Backend
* [Flask](https://github.com/pallets/flask)
* [Flask-RESTful](https://github.com/flask-restful/flask-restful)
* [MongoDB](https://github.com/mongodb/mongo)
* [Adguard Home](https://github.com/AdguardTeam/AdGuardHome)

### Machine Learning
* [Sklearn](https://github.com/scikit-learn/scikit-learn)
* [Flask](https://github.com/pallets/flask)

_Other dependencies are listed in requirements.txt and package.json files of respective modules._