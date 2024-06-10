const getOriginUrl = (req) => {
  return `${req.protocol}://${req.get("host")}`
}

module.exports = getOriginUrl
