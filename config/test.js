const ContextBuilder = require('sb-qq-bot-framework/lib/contextBuilder')
const admins = require('./admins')
const path = require('path')
const appDir = path.dirname(require.main.filename)

module.exports = [
  {
    for: ContextBuilder((app) => app.user(879724291), 'any'),
    use: [
      {
        type: 'node_module',
        require: 'koishi-plugin-blame',
        subPlugin: 'v2',
        options: {
          send: {
            private: [879724291]
          }
        }
      }
    ]
  }
]
