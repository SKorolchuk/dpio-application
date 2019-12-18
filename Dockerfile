FROM node:12 as build

WORKDIR /app

COPY . .

RUN npm install && npm run build

RUN ls -l && ls -l /app/dist/apps/dpio-application

FROM nginx:latest

RUN rm -rf /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/apps/dpio-application/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
