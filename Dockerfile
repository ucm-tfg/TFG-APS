FROM node:15-alpine

RUN mkdir -p /app

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build:prod

EXPOSE 8080

CMD ["node", "server/server.js"]
