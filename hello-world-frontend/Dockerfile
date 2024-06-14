FROM node:20.14.0-alpine AS builder

WORKDIR /app

COPY hello-world-frontend/package*.json ./

RUN npm install

COPY hello-world-frontend/ ./

RUN npm run build

FROM node:20.14.0-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

CMD ["serve", "-s", "dist"]