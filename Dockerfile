FROM node:18-alpine

WORKDIR /usr/app

ADD package*.json .

RUN npm install

COPY ./build .

RUN npm run build 


CMD [ "node", "build/index.js" ]

