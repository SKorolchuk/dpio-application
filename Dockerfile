FROM node:9-alpine

ENV PORT 44301
EXPOSE 44301
ENV NODE_ENV "production"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i npm@latest -g

RUN npm install

COPY . .

RUN npm run build:all

ENTRYPOINT node ./dist/server.js