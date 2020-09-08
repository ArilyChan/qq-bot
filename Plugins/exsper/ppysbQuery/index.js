const PPYsbQuery = require('ppysb-query-ripple')
module.exports.name = 'ppysbQuery'
module.exports.apply = (ctx, options) => {
  const pbq = new PPYsbQuery(options)
  ctx.middleware(async (meta, next) => {
    try {
      const message = meta.message
      const userId = meta.userId
      const reply = await pbq.apply(userId, message)
      if (reply) return meta.$send(`[CQ:at,qq=${userId}]` + '\n' + reply)
      return next()
    } catch (ex) {
      console.log(ex)
      return next()
    }
  })
}
