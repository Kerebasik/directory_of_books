FROM node:19

WORKDIR /usr/src/app

COPY package*.json /usr/src/app

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]