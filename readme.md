# github proxy

## 简介

github proxy 是一个简单的 github 代理，用于解决 github 访问速度慢的问题。

不同分支代表使用不同的语言/技术实现，可以根据自身情况进行选择。

## 分支详情

- **master 分支**：使用 nginx 反向代理实现（推荐）
- **nodejs 分支**：使用 express + http-proxy-middleware 实现

## 特点

- 完整代理 GitHub 主站、API、assets、avatars、release-assets 等子域名
- 自动替换页面内所有链接为代理地址，无需手动修改
- 按需加载通知依赖，后续页面访问仅注入 400B 脚本（sessionStorage 控制）
- 支持 GitHub 登录（需配置 HTTPS）

## 使用 Docker 部署

### 方式一：docker run

```sh
docker run -d \
  -p 80:80 \
  --name github-proxy \
  ghcr.io/xclhove/github-proxy:1.31.1
```

### 方式二：docker compose

```sh
docker compose up -d
```

### 方式三：本地开发测试

```sh
docker compose -f docker-compose.test.yaml up -d
# 修改 src/nginx.conf 后重启即可
docker compose -f docker-compose.test.yaml restart
```

## 构建

```sh
docker build -t github-proxy:1.31.1 .
```

支持通过构建参数指定 nginx 版本和架构：

```sh
docker build \
  --build-arg NGINX_VERSION=1.31.1 \
  --build-arg ALPINE_ARCH=amd64 \
  -t github-proxy:1.31.1 .
```

## ⚠️ 需要 HTTPS！

本代理涉及 GitHub 登录等敏感操作，**必须**配置 HTTPS。

建议在生产环境使用反向代理（如 Caddy、Nginx）或云服务商的 TLS 终止功能来配置 HTTPS。

## 项目结构

```
.
├── .github/workflows/build.yml   # 自动构建（打 v* 标签触发）
├── Dockerfile                     # 基于 nginx:1.31.1-alpine
├── docker-compose.yaml            # 生产部署
├── docker-compose.test.yaml       # 本地开发（挂载本地配置）
├── src/
│   ├── nginx.conf                 # 核心反向代理配置
│   ├── css/element-plus.css       # 通知弹窗样式
│   ├── js/
│   │   ├── vue.min.js             # Vue 3 运行时
│   │   ├── element-plus.min.js    # Element Plus 运行时
│   │   ├── inject.js              # 入口脚本（按需加载依赖）
│   │   └── notification.js        # 通知弹窗逻辑
│   └── nginx.conf
└── readme.md
```
