const { App } = require('koishi')
module.exports.name = 'test'
module.exports.apply = (app) => {
  app.middleware((meta, next) => {
    console.log(meta)
    const ctx = meta.$app
    let ctx2
    const cmd = meta.message.split(' ')
    const action = cmd[0]
    if (!action === 'switch-ctx') return next()
    const type = cmd[1]
    if (!['group', 'user', 'groups', 'users'].includes(type)) return next()
    const excpet = cmd[2] === 'except'
    const args = cmd.slice(3)
    console.log({ action, type, args })
    ctx2 = excpet ? ctx[type].except(...args) : ctx[type](...args)
    console.log(ctx2.match(meta))
    const middlewares = ctx._hooks[App.MIDDLEWARE_EVENT]
    middlewares.map(m => {
      const [ctx, middleware] = m
      // ctx.dispose()
      ctx2.addListener(App.MIDDLEWARE_EVENT, middleware)
    })
    meta.$app.dispose()
    // ctx.stop()
    // app.stop()
    // app.start()
  })
}
