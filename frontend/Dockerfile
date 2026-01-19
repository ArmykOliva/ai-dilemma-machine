# Use the latest Node.js LTS (Node 24 as of Oct 2025)
FROM node:24-alpine

# Install curl for health checks
RUN apk add --no-cache curl

WORKDIR /app

# Install dependencies using layer caching
COPY package.json package-lock.json* ./
COPY tsconfig*.json ./

# Copy the full project
COPY . .

# Copy and make entrypoint script executable
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 5173

# Use entrypoint script that auto-generates types on startup
ENTRYPOINT ["/docker-entrypoint.sh"]