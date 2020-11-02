const ContextBuilder = require('sb-qq-bot-framework/lib/contextBuilder')
const admins = require('./admins')

module.exports = [
  {
    for: ContextBuilder((app) => app, 'any'),
    use: [
      // {
      //   type: 'node_module',
      //   require: 'arilychan-radio',
      //   options: {
      //     web: {
      //       host: 'https://bot.ri.mk',
      //       path: '/radio'
      //     },
      //     expire: 7,
      //     isAdmin (meta) {
      //       return admins.includes(meta.userId)
      //     }
      //   }
      // },
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
