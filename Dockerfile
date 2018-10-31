FROM node:10-stretch AS build-env

WORKDIR /usr/src/build

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build:all

FROM node:10-alpine

WORKDIR /usr/src/app

COPY --from=build-env /usr/src/build/dist/ ./dist/

ENTRYPOINT [ "node", "dist/server.js" ] 