
### Builder stage: install and build the app
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package manifests first to leverage Docker cache
COPY package.json pnpm-lock.yaml* package-lock.json* ./

# Install pnpm and dependencies (use frozen lockfile for reproducible builds)
RUN npm install -g pnpm && \
	pnpm install --frozen-lockfile

# Copy source and build
COPY . .
RUN pnpm run build


### Production stage: serve static files with nginx
FROM nginx:stable-alpine

LABEL org.opencontainers.image.source="EvaluacionTecnica/front"

# Remove default nginx content and copy build
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html

# Provide SPA fallback to index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Use nginx default entrypoint; container will serve on port 80
CMD ["nginx", "-g", "daemon off;"]
