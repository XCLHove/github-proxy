# github proxy

## 简介

github proxy 是一个简单的 github 代理，用于解决 github 访问速度慢的问题。

不同分支代表使用不同的语言/技术实现，可以根据自身情况进行选择。

## 分支详情

* master分支：使用 nginx反向代理 实现（推荐）
* nodejs分支：使用 express + http-proxy-middleware 实现

## 使用 Docker 部署

---

### nginx 实现
```sh
docker run -d -it \
  -p 80:80 \
  --name github-proxy \
  ghcr.io/xclhove/github-proxy:1.0.0
```

需要 `HTTPS` ！！！

需要 `HTTPS` ！！！

需要 `HTTPS` ！！！

---