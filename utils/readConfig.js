const fs = require("fs")

const readConfig = () => {
  try {
    return JSON.parse(fs.readFileSync("./package.json").toString()).server
  } catch (e) {
    throw new Error("读取配置文件失败，错误信息：\n" + e.message)
  }
}

module.exports = readConfig
