FROM node:9-alpine AS app-env

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i npm@latest -g

RUN npm install

COPY . .

RUN npm run build:all

ENTRYPOINT node ./dist/server.js