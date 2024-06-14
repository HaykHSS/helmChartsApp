FROM node:20.14.0-alpine AS builder

WORKDIR /app

COPY hello-world-frontend/package*.json ./

RUN npm install

COPY hello-world-frontend/ ./

RUN npm run build

FROM nginx:alpine

COPY hello-world-frontend/nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
