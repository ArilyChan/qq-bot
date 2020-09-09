const SillyChooser = require('sillychooser')
module.exports.name = 'sillyChooser'
module.exports.apply = (ctx, options) => {
  const sc = new SillyChooser(options)
  ctx.middleware(async (meta, next) => {
    try {
      const message = meta.message
      const userId = meta.userId
      const reply = sc.apply(meta.selfId, userId, message)
      if (reply) {
        if (meta.messageType !== 'private') return meta.$send(`[CQ:reply,id=${meta.messageId}]` + reply)
        return meta.$send(reply)
      }
      return next()
    } catch (ex) {
      console.log(ex)
      return next()
    }
  })
}
