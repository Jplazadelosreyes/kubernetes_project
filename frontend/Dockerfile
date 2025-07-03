# Fase de build
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Fase de producción con nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# nginx config personalizada si la tienes
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
