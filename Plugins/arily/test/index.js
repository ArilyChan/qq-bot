const { App } = require('koishi')
module.exports.name = 'test'
module.exports.apply = (app) => {
  app.middleware((meta, next) => {
    const ctx = meta.$app
    const cmd = meta.message.split(' ')
    const action = cmd[0]
    if (!action === 'switch-ctx') return next()
    const type = cmd[1]
    if (!['group', 'user', 'groups', 'users'].includes(type)) return next()
    const except = cmd[2] === 'except'
    const args = cmd.slice(3).map(id => parseInt(id))
    console.log({ action, type, args })
    const ctx2 = except ? app[type].except(...args) : app[type](...args)
    const scope = ['groups', 'group'].includes(type) ? 'groups' : 'users'
    if (scope === 'users') args.map(id => { if (!ctx2.scope[scope].includes(id)) ctx2.scope[scope].push(id) })
    if (scope === 'users') {
      ctx2.scope.groups.length = 0
      delete ctx2.scope.groups.positive
    }
    if (scope === 'groups') {
      ctx2.scope.users.length = 0
      delete ctx2.scope.users.positive
    }
    console.log(ctx2.scope)
    const middlewares = [...ctx._hooks[App.MIDDLEWARE_EVENT]]
    ctx._hooks[App.MIDDLEWARE_EVENT] = []
    middlewares.map(m => {
      const [ctx, middleware] = m
      ctx2.middleware(middleware)
    })
  })
}
