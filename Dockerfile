FROM node

WORKDIR /usr/app

COPY . .

RUN npm install

RUN npm run build 

CMD [ "node", "build/index.js" ]

