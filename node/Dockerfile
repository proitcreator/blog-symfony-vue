FROM node:alpine

COPY nuxt /app

WORKDIR /app

RUN npm install --save-dev --legacy-peer-deps

CMD npm run dev -- -o
