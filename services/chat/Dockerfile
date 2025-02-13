FROM node:23.7.0

WORKDIR /app

RUN npm install -g pnpm@10.2.1



COPY package.json pnpm-lock.yaml ./


RUN pnpm install


COPY . .

RUN ls -al tsconfig.json

RUN pnpm tsc

EXPOSE 4003

CMD ["node","dist/index.js"]
