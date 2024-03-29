FROM node:20

WORKDIR /app/frontend

COPY package.json .
COPY package-lock.json .

RUN npm install -g npm@10.5.0
RUN npm install

COPY . .
RUN npm run build
CMD [ "npm", "start" ]