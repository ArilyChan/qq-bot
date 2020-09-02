module.exports.name = 'test'
// 插件处理和输出
module.init = () => ({
  count: 0
})
module.exports.apply = (ctx, options = {}, history) => {
  const isAfter = options.after || false
  const exclusive = options.exclusive || false
  ctx.middleware((meta, next) => {
    if (meta.$parsed.prefix) {
      if (meta.$parsed.message !== exclusive) {
        meta.$send(`triggered${isAfter ? '(after)' : ''}`)
        history.count += 1
      } else return next()
    } else return next()
  })
}
