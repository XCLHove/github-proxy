const express = require("express")
const { createProxyMiddleware } = require("http-proxy-middleware")
const zlib = require("zlib")
const readConfig = require("./utils/readConfig.js")
const getOriginUrl = require("./utils/getOriginUrl.js")

const config = readConfig()
const server = express()

const githubUrl = "https://github.com"
server.use(
  "/",
  createProxyMiddleware({
    target: githubUrl,
    changeOrigin: true,
    on: {
      proxyReq: (proxyReq, req, _) => {
        const originUrl = getOriginUrl(req)
        proxyReq.setHeader("x-pjax-url", `${originUrl}${req.url}`)
        proxyReq.setHeader("Origin", `https://github.com`)
        proxyReq.setHeader("Host", `github.com`)
      },
      // proxyRes: (proxyRes, req, res) => {
      //   const originUrl = getOriginUrl(req)
      //
      //   // 修改重定向跳转
      //   let location = proxyRes.headers["location"]
      //   if (location) {
      //     location = location.replace(
      //       /^https:\/\/github\.com(.*)/,
      //       `${originUrl}\$1`,
      //     )
      //     proxyRes.headers["location"] = location
      //   }
      //
      //   // 替换html中的链接
      //   const body = []
      //   proxyRes.on("data", (chunk) => {
      //     body.push(chunk)
      //   })
      //   proxyRes.on("end", () => {
      //     let responseData = ""
      //     // 压缩格式为gzip，解压
      //     if (proxyRes.headers["content-encoding"] === "gzip") {
      //       responseData = zlib.gunzipSync(Buffer.concat(body)).toString()
      //     }
      //     responseData ||= Buffer.concat(body).toString()
      //
      //     const githubUrl = "https://github.com"
      //     const encodeGithubUrl = encodeURIComponent(githubUrl)
      //
      //     responseData = responseData.replaceAll(githubUrl, originUrl)
      //     responseData = responseData.replaceAll(encodeGithubUrl, originUrl)
      //
      //     res.end(responseData)
      //   })
      // },
    },
  }),
)

server.listen(config.port, () => {
  console.log(`http://localhost:${config.port}`)
})
