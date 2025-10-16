# Vetra UI - Production Dockerfile
# Supports both static (:static) and dynamic (:dynamic) runtime modes

ARG RUNTIME_MODE=static

# Stage 1: Dependencies
FROM node:24-alpine AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile

# Stage 2: Builder
FROM node:24-alpine AS builder
WORKDIR /app

ARG RUNTIME_MODE=static
ENV NEXT_RUNTIME_MODE=:${RUNTIME_MODE}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN if [ "${RUNTIME_MODE}" = "dynamic" ]; then pnpm build:dynamic; else pnpm build:static; fi

# Stage 3a: Static runner (nginx)
FROM nginx:alpine AS static-runner
RUN apk add --no-cache wget

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=builder /app/out .
COPY nginx.conf /etc/nginx/conf.d/default.conf

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Stage 3b: Dynamic runner (Next.js standalone)
FROM node:24-alpine AS dynamic-runner
WORKDIR /app
ENV NODE_ENV=production

RUN apk add --no-cache curl

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=5 \
  CMD curl -fsS http://localhost:3000/ || exit 1

EXPOSE 3000
CMD ["node", "server.js"]

# Final stage selector
ARG RUNTIME_MODE=static
FROM ${RUNTIME_MODE}-runner
