FROM node:12 as build

WORKDIR /pkgs

COPY package.json package-lock.json /pkgs/

RUN cd /pkgs && npm install

WORKDIR /app

COPY . .

RUN mv /pkgs/node_modules /app

RUN cd /app && npm run build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/apps/dpio-application /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
