const CabbageReaction = require('./Cabbage/CabbageReaction')
const Command = require('./Command')

// const RollReaction = require('./Roll/RollReaction')
// const ExsperReaction = require('./Exsper/ExsperReaction');
module.exports.name = 'BlackFarts'
const { menu, models: menuModels } = require('./Cabbage/menu')
module.exports.init = (options) => ({
  originalMenu: menu,
  menu: {},
  menuModels
})

const web = require('./server')
let webInited = false
module.exports.webView = (options, storage) => {
  if (webInited) return undefined
  webInited = true
  return web(storage)
}

module.exports.apply = function (app, options, storage) {
  const logger = app.logger()
  logger.success('loaded')
  options = { exclusive: [738401694] }
  const reaction = require('./Cabbage/CabbageReactionConfig')
  const cabbageReaction = new CabbageReaction(reaction)
  // const rollReaction = new RollReaction();
  // const exsperReaction = new ExsperReaction();

  app.middleware(async (meta, next) => {
    let reacted = false
    if (meta.message[0] === '!' || meta.message[0] === '！') {
      reacted = Object.entries({ cabbageReaction }).some(([name, reaction]) => {
        if (reaction.reactTo(new Command({ meta, app, storage }))) {
          // console.log(`${meta.message} Catched by subplugin: ${name}`);
          return true
        }
        return false
      })
    }
    if (!reacted) return next()
  })
}
