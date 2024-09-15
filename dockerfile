FROM nginx:1.27.1

WORKDIR /app

COPY src /app

COPY src/nginx.conf /etc/nginx/conf.d/default.conf

LABEL org.opencontainers.image.source https://github.com/xclhove/github-proxy