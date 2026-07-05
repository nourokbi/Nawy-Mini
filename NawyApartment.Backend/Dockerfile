# ---- Backend: Express + Prisma + TypeScript ----
FROM node:22-slim

WORKDIR /app

# Prisma's CLI needs OpenSSL available on Debian "slim" images.
RUN apt-get update -y \
  && apt-get install -y --no-install-recommends openssl \
  && rm -rf /var/lib/apt/lists/*

# 1) Install dependencies first (this layer is cached unless the
#    package files change, so rebuilds are fast).
COPY package.json package-lock.json ./
RUN npm ci

# 2) Copy the rest of the source, generate the Prisma client, build TS -> dist.
COPY . .
RUN npx prisma generate
RUN npm run build

# 3) The backend listens on 3001.
EXPOSE 3001

# 4) On container start: apply DB migrations, seed the 21 apartments,
#    then launch the compiled server.
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && node dist/index.js"]
