FROM node:20.14.0-alpine AS builder

WORKDIR /app

COPY hello-world-frontend/package*.json ./

# COPY package*.json ./


RUN npm install

COPY hello-world-frontend/ ./

# COPY . .

RUN npm run build

FROM nginx:alpine

RUN apk add --no-cache gettext

COPY nginx.conf /etc/nginx/templates/nginx.conf.template


COPY hello-world-frontend/nginx.conf /etc/nginx/nginx.conf

# COPY nginx.conf /etc/nginx/nginx.conf


COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]
CMD ["sh", "-c", "envsubst '${BACKEND_HOST}' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"]

