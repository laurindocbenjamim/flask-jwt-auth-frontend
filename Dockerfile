# Build stage
FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install --silent

# Copy source and build
COPY . .
RUN npm run build

# Production stage - Nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

# If project includes a custom nginx.conf, copy it (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
