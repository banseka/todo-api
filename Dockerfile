FROM node

WORKDIR /usr/app

ADD package*.json .

RUN npm install

RUN npm run build 

ADD ./build .

CMD [ "node", "build/index.js" ]

