FROM node:18 as builder

COPY . /app
COPY fly/.env.production /app
WORKDIR /app
RUN npm install && npm run build -- --minify terser

FROM caddy:2
COPY --from=builder /app/dist/ /usr/share/caddy/
COPY fly/Caddyfile /etc/caddy/Caddyfile
