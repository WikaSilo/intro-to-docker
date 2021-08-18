FROM node:14.15

WORKDIR /usr/local/app/express-demo

ENV PORT=3000

COPY package.json package-lock.json ./

RUN npm install -g nodemon
RUN npm install

COPY ./ ./

CMD ["npm", "run", "dev"]