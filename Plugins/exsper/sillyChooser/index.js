const SillyChooser = require('sillychooser')
module.exports.name = 'sillyChooser'
module.exports.apply = (ctx, options) => {
  const sc = new SillyChooser(options)
  ctx.middleware(async (meta, next) => {
    try {
      const message = meta.message
      const userId = meta.userId
      const reply = sc.apply(meta.selfId, userId, message)

      if (!reply) return next()
      const replyMessage = []
      if (meta.messageType !== 'private') replyMessage.push(`[CQ:reply,id=${meta.messageId}]`)
      replyMessage.push(reply)
      // if (reply) return meta.$send(`[CQ:at,qq=${userId}]` + '\n' + reply)
      meta.$send(replyMessage.join(''))
    } catch (ex) {
      console.log(ex)
      return next()
    }
  })
}
