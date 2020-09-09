const SillyChooser = require('sillyChooser')
module.exports.name = 'sillyChooser'
module.exports.apply = (ctx, options) => {
  const sc = new SillyChooser(options)
  ctx.middleware(async (meta, next) => {
    try {
      const message = meta.message
      const userId = meta.userId
      const reply = sc.apply(meta.selfId, userId, message)
      if (reply) return meta.$send(`[CQ:at,qq=${userId}]` + '\n' + reply)
      return next()
    } catch (ex) {
      console.log(ex)
      return next()
    }
  })
}
