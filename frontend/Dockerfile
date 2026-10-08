# syntax=docker/dockerfile:1

FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:24-alpine AS build
WORKDIR /app
# Page metadata (link-preview URLs) is fixed at build time, so the public URL is a build argument.
ARG SITE_URL=http://localhost:3000
ENV NEXT_TELEMETRY_DISABLED=1 \
    SITE_URL=$SITE_URL
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:24-alpine AS runtime
WORKDIR /app
# Browsers send every localhost cookie to every port; other local apps can push
# headers past Node's 16 KB default and cause "431/400 Bad Request".
ENV NODE_ENV=production \
    NODE_OPTIONS=--max-http-header-size=65536 \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000
RUN addgroup -S app && adduser -S app -G app
COPY --from=build --chown=app:app /app/.next/standalone ./
COPY --from=build --chown=app:app /app/.next/static ./.next/static
COPY --from=build --chown=app:app /app/public ./public
# Fonts read at request time by the generated icon and link-preview image.
COPY --from=build --chown=app:app /app/assets ./assets
USER app
EXPOSE 3000
CMD ["node", "server.js"]
