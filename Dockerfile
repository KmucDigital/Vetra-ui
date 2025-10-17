# Vetra UI - Production Dockerfile (static export)

# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable && corepack prepare pnpm@latest --activate

# CRITICAL: Verify LICENSE integrity before building
# This prevents building Docker images with modified or missing LICENSE
RUN echo "🔒 Verifying LICENSE integrity..." && \
    node scripts/check-license.js || \
    (echo "❌ LICENSE check failed - Docker build terminated" && exit 1)

RUN pnpm build

# Verify LICENSE is included in the build output
RUN test -f LICENSE || (echo "❌ LICENSE file missing after build" && exit 1)

# Stage 3: Static runner (nginx)
FROM nginx:alpine AS runner
RUN apk add --no-cache wget

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=builder /app/out .
COPY nginx.conf /etc/nginx/conf.d/default.conf

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
