// const filters = require('../lib/filters')
const path = require('path')
const appDir = path.dirname(require.main.filename)
const recipeFilter = require('./filters/group.blackFarts.recipe')

const ContextBuilder = require('sb-qq-bot-framework/lib/contextBuilder')
const { EventEmitter } = require('events')

const eventBus = new EventEmitter
const sharedState = {}
module.exports = [
  // {
  //   for: ContextBuilder((app) => app, 'any'),
  //   use: [
  //     {
  //       type: 'node_module',
  //       require: 'blackfarts',
  //       priority: 1,
  //       filter: [
  //         meta => recipeFilter(263668213)(meta).then(result => {
  //           if (!result) meta.$send('去别的群试试吧.')
  //           return result
  //         }),
  //         require('./filters/group.blackFarts.recipe.restrictHours')([{ from: 9, to: 11 }, { from: 14, to: 17 }, { from: 20, to: 24 }], 738401694)
  //       ]

  //     }, {
  //       type: 'local',
  //       path: 'Plugins/arily/recorder',
  //       subPlugin: 'recorder',
  //       options: {
  //         db: {
  //           uri: process.env.RECORDER_DB_URI
  //         }
  //       },
  //       priority: 9999
  //     }, {
  //       type: 'local',
  //       path: 'Plugins/arily/recorder',
  //       subPlugin: 'slipper',
  //       filter: [
  //         // meta => !meta.message.startsWith('*'),
  //         // meta => !meta.message.startsWith('今日运势')
  //       ],
  //       priority: -1

  //     }, {
  //       type: 'local',
  //       path: 'Plugins/exsper/sillyChooser',
  //       priority: 2,
  //       options: {
  //         prefixs: ['!', '！']
  //       }
  //     }, {
  //       type: 'local',
  //       path: 'Plugins/exsper/ppysbQuery',
  //       priority: 4,
  //       options: {
  //         admin: [879724291], // 管理员自行添加
  //         database: path.join(appDir, 'Plugins/exsper/ppysbQuery/storage/database.db'), // __dirname为config文件夹
  //         prefixs: ['*'],
  //         eventBus,
  //         sharedState
  //       }
  //     }, {
  //       type: 'local',
  //       path: 'Plugins/exsper/osuerCalendar',
  //       priority: 3,
  //       options: {
  //         eventBus,
  //         sharedState,
  //         users: {
  //           admin: [879724291], // 管理员自行添加
  //           blackList: [],
  //           whiteList: []
  //         },
  //         eventFile: path.join(appDir, 'Plugins/exsper/osuerCalendar/osuercalendar-events.json') // __dirname为config文件夹
  //       }
  //     }
  //   ]
  // },
  {
    for: ContextBuilder((app) => app.group(1097526643), 'test-groups'),
    use: [
      {
        type: 'node_module',
        require: 'arilychan-radio',
        options: {
          web: {
            host: 'http://ri.mk:3005',
            path: '/radio'
          },
          expire: 7
        }
      },
      // {
      //   type: 'node_module',
      //   require: 'koishi-plugin-mongo',
      //   options: {
      //     uri: process.env.DB_URI,
      //     name: 'ArilyChan'
      //   }
      // },
      // {
      //   type: 'node_module',
      //   require: 'koishi-plugin-eval-addons'
      // },
      {
        type: 'node_module',
        require: 'koishi-plugin-eval',
        options: {
          userFields: ['foo', 'id', 'authority'],
          setupFiles: {
            'fetch.js': `${appDir}/config/eval/fetch.js`,
            'cqcode-builder': `${appDir}/config/eval/cqcode.js`
          }
        }
      }
    ]
  }
]
