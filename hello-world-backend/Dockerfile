FROM node:20.14.0-alpine AS builder

WORKDIR /app

# COPY hello-world-backend/package*.json ./
# COPY package*.json .
COPY helmChartsApp-main/hello-world-backend/package*.json ./



RUN npm install

# COPY hello-world-backend/ ./
# COPY . .
COPY helmChartsApp-main/hello-world-backend/ ./



RUN npm run build

FROM node:20.14.0-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/index.js ./

RUN npm install --production


CMD ["node", "index.js"]
