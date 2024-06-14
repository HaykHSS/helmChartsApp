# Build stage
FROM node:20.14.0-alpine AS builder

WORKDIR /app

COPY hello-world-frontend/package*.json ./

RUN npm install

COPY hello-world-frontend/ ./

RUN npm run build

# Nginx stage
FROM nginx:alpine

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the build output to the Nginx HTML directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
