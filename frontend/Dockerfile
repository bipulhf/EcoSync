FROM node:20

WORKDIR /app/frontend

COPY package.json .
COPY package-lock.json .

RUN npm install -g pnpm && pnpm install

COPY . .
RUN pnpm run build
CMD [ "pnpm", "start" ]
