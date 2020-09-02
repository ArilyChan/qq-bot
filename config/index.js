function req (req, conf, def = {}) {
  try {
    return require(req)
  } catch (error) {
    console.log(error)
    return def
  }
}

exports.koishi = req('./koishi')
exports.contextPlugins = req('./contextPlugins', undefined, [])
