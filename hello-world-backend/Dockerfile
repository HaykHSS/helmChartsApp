FROM node:20.14.0-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20.14.0-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/index.js ./

RUN npm install --production

EXPOSE 3001

CMD ["node", "index.js"]
