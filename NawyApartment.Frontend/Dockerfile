# ---- Frontend: Next.js (multi-stage build) ----

# Stage 1: build the app
FROM node:22-slim AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# NEXT_PUBLIC_* vars are baked into the client bundle at BUILD time, so the
# browser's backend URL must be provided here (not just at runtime).
ARG NEXT_PUBLIC_API_BASE
ENV NEXT_PUBLIC_API_BASE=$NEXT_PUBLIC_API_BASE
# Requires `output: "standalone"` in next.config.ts. Produces a self-contained
# server in .next/standalone with only the node_modules it actually needs.
RUN npm run build

# Stage 2: tiny runtime image with just the built output
FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
# Print a clear, host-facing URL before Next's own (container-internal) log line.
CMD ["sh", "-c", "echo \"Frontend is running → ${APP_URL:-http://localhost:3000}\" && node server.js"]
