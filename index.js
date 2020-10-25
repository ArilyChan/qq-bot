require('dotenv').config()
const path = require('path')
const appDir = path.dirname(require.main.filename)
const { express, http } = require('sb-qq-bot-framework/lib/WebServer')

const config = require(`${appDir}/config`)
console.log(config)

const app = require('sb-qq-bot-framework/lib/Bot')(config.koishi)

try {
  const pluginLoader = require('sb-qq-bot-framework/lib/ContextPluginApply')
  const Loaded = pluginLoader(app, config.contextPlugins)
  // console.log(Loaded.webViews)
  Loaded.webViews.map(async v => {
    const middleware = v.expressApp(v.options, await v.pluginData, http)
    if (!middleware) return
    console.log(v.name, 'installed on', v.path)
    express.use(v.path, middleware)
  })
  http.listen(3005, () => console.log('Bot web app listening on port 3005!'))
} catch (error) {
  console.log(error)
}

let count = 0
const maxTries = 3
try {
  while (count++ <= maxTries) {
    try {
      app.start()
    } catch (e) {
      console.log('⚠️Uncatched Exception!!')
      console.log(e.stack)
      if (count >= maxTries) throw e
    }
  }
} catch (e) {
  console.log('Max retries exceed. Quit now.')
  console.log(e)
}
