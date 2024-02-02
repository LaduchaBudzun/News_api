FROM node:16.0.0

WORKDIR /app

COPY package.json package.json 
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

COPY .env .env

CMD ["node", "index.js"]