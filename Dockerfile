FROM node:18-alpine

WORKDIR /usr/app

ADD package*.json .

RUN npm install

RUN npm run build 

COPY ./build .

CMD [ "node", "build/index.js" ]

