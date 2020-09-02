const filters = require('sb-qq-bot-framework/lib/filters')
module.exports = (...groups) => meta => filters.blockGroup(...groups)(meta).then(result => !(!result && ['吃啥', '吃什么', '吃什麼'].includes(meta.$parsed.message) && meta.$parsed.prefix !== null))
