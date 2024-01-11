FROM node

WORKDIR /usr/app

COPY . .

RUN npm install

RUN npm run build --development

CMD [ "node", "dist/index.js" ]

