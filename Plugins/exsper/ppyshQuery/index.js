const PPYshQuery = require('ppysh-query')
module.exports.name = 'PPYshQuery'
module.exports.apply = (ctx, options) => {
  const phq = new PPYshQuery(options)
  ctx.middleware(async (meta, next) => {
    try {
      const message = meta.message
      const userId = meta.userId
      const reply = await phq.apply(userId, message)
      if (reply) {
        // record格式不要艾特
        if (reply.indexOf('CQ:record') > 0) {
          await meta.$send(reply)
        } else {
          await meta.$send(`[CQ:at,qq=${userId}]` + '\n' + reply)
        }
      } else return next()
    } catch (ex) {
      console.log(ex)
      return next()
    }
  })
}
