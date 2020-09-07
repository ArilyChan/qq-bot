// const filters = require('../lib/filters')
const recipeFilter = require('./filters/group.blackFarts.recipe')

const ContextBuilder = require('sb-qq-bot-framework/lib/contextBuilder')

module.exports = [
  {
    for: ContextBuilder((app) => app, 'any'),
    use: [
      {
        type: 'node_module',
        require: 'blackfarts',
        priority: 1,
        filter: [
          meta => recipeFilter(263668213)(meta).then(result => {
            if (!result) meta.$send('去别的群试试吧.')
            return result
          }),
          require('./filters/gorup.blackFarts.recipe.restrictHours')([{ from: 9, to: 11 }, { from: 14, to: 17 }, { from: 20, to: 24 }], 263668213)
        ]
      },
      {
        type: 'local',
        path: 'Plugins/arily/recorder',
        subPlugin: 'recorder',
        priority: 9999
      },
      {
        type: 'local',
        path: 'Plugins/arily/recorder',
        subPlugin: 'slipper',
        filter: [
          meta => !meta.message.startsWith('*'),
          meta => !meta.message.startsWith('今日运势')
        ],
        priority: -1
      }]
  }
]
