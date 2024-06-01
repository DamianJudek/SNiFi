# SNiFi Frontend

Full technical frontend documentation is available in our [wiki](https://github.com/DamianJudek/SNiFi/wiki#frontend)


## Requirements 

* NPM version 10.2.3

## Development 

To start working on frontend there are two ways:

* First is to use dockerised environment, just simply run `docker compose up --wait -d` from main folder and access frontend at `http://localhost:80`
* Second (manuall steps)
  * Go to `/frontend` folder
  * Instal dependencies `npm i`
  * Run `npm run dev`
  * Access frontend at `http://localhost:4173`

## Build 

In order to create production build of app please run `npm run build` command. Production build will appear in /dist folder.


