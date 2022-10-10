FROM node:18-alpine3.15
LABEL author=ThisIsntTheWay
LABEL version=0.1

RUN apk update && \
	apk add --no-cache bash git nano

WORKDIR /opt/
RUN git clone https://github.com/ThisIsntTheWay/circle-api.git

WORKDIR /opt/circle-api
RUN ls
RUN npm install

EXPOSE 8080
VOLUME /opt/circle-api

ENTRYPOINT node index.js