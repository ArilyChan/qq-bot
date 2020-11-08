const ContextBuilder = require('sb-qq-bot-framework/lib/contextBuilder')
const admins = require('./admins')
const path = require('path')
const appDir = path.dirname(require.main.filename)

module.exports = [
  {
    for: ContextBuilder((app) => app.user(879724291), 'any'),
    use: [
      {
        type: 'local',
        path: 'Plugins/exsper/ppyshQuery',
        priority: 5,
        options: {
          admin: admins, // 管理员自行添加
          apiKey: '27caa4993a4430b2e63762bdd5e6b9643ddf7679', // osu Api token，必要
          database: path.join(appDir, 'Plugins/exsper/ppyshQuery/storage/database.db'),
          prefixs: ['?', '？']
        }
      },
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
