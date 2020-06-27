# The builder from node image
FROM node:11-alpine as builder

RUN mkdir /app
WORKDIR /app
COPY . .
FROM nginx:alpine
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./dist /usr/share/nginx/html
EXPOSE 4200 4200

ENTRYPOINT ["nginx", "-g", "daemon off;"]