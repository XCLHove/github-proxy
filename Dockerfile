# ============================================================
# GitHub 反向代理 — Nginx
# ============================================================
# 构建方式：
#   docker build -t github-proxy:1.31.1 .
#
# 若需指定不同的 Nginx 基础镜像版本：
#   docker build \
#     --build-arg NGINX_VERSION=1.31.1 \
#     -t github-proxy:1.31.1 .
# ============================================================

ARG NGINX_VERSION=1.31.1

FROM nginx:${NGINX_VERSION}-alpine

# 在 FROM 之后重新声明 ARG，使其对以下指令可见
ARG NGINX_VERSION

LABEL org.opencontainers.image.title="GitHub Proxy"
LABEL org.opencontainers.image.description="GitHub 反向代理，解决网络访问问题"
LABEL org.opencontainers.image.version="${NGINX_VERSION}"
LABEL org.opencontainers.image.source="https://github.com/xclhove/github-proxy"

# 拷贝静态资源与 Nginx 配置
WORKDIR /app
COPY src /app
COPY src/nginx.conf /etc/nginx/conf.d/default.conf

# 验证配置语法
RUN nginx -t

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
