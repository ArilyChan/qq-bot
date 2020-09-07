const StatusMe = require('./StatusMe')
const config = require('./cabbageReactionUser')

const usage = {
  anotherelo: '【叹号】anotherelo <osu用户名或id>',
  'elo.upload': '【叹号】elo.upload <mp id> [比赛名]:格式示例: EloWeeklyCup Season0 1400-1800。',
  sendMatchResult: '【叹号】elo.result <MatchId>',
  // '排': `【叹号】(排, join) <osu用户名或id> `,
  // '找打': `【叹号】(找打, rival, rivals) `,
  // '不打了': `【叹号】(不打了, drop, quit) `,
  // joinTeam: `【叹号】(team.join, jointeam) <osu用户名或id>#<队伍名>`,
  // quitTeam: `【叹号】(team.quit, quitteam) <osu用户名或id>#<队伍名>`,
  // registerTeam: `【叹号】(team.create, createteam) <队伍名>`,
  dad: '【叹号】(dad, dad_of) <osu用户名或id>',
  // findTeam: `【叹号】(team.find, findteam) <队伍名>`,
  // findTeamsByRank: `【叹号】(team.findbyrank, findteamsbyrank, findteambyrank) <分段>`,
  say: '【叹号】say <...something>',
  吃啥: '❗️吃啥 [菜单] [特殊需求]',
  加个菜: '❗️加个菜 <菜单> <菜名> (换行)[中人的图片]',
  倒: '倒 <菜单> <菜名>'

}
const desc = {
  anotherelo: '查询elo',
  'elo.upload': '上传成绩给爆炸',
  sendMatchResult: '查询比赛结果',
  排: '加入匹配 ',
  找打: '寻找合适的对手 ',
  不打了: '退出匹配 ',
  joinTeam: '参加队伍',
  quitTeam: '退出已参加的队伍',
  registerTeam: '创建（新）队伍',
  dad: '找爸爸',
  findTeam: '找队伍',
  findTeamsByRank: '按照分段搜索队伍',
  say: '代理发言'
}

const blackfart = ({ meta, app }) => {
  // const logger = app.logger('CabbageReaction');
  if (config.blackFartTo(meta.userId)) {
    setTimeout(() => meta.$send(`${meta.sender.nickname}牛逼`), 1000 * 5)
  }
}

function helps ({ meta, app }) {
  const helpcontents = Object.entries(usage).map(([name, usage]) => `${usage}: ${(desc[name] !== undefined) ? desc[name] : '未添加命令说明'}`)
  meta.$send(helpcontents.join('\n'))
}
module.exports = {
  help: helps,
  sleep: '昨天不是刚睡过吗？怎么又要睡',
  wakeup: '早',
  早: '早',
  status: StatusMe,
  bpme: blackfart,
  pr: blackfart,
  stat: blackfart,
  say: async ({ command, meta, app }) => {
    const message = command.slice(1).join(' ').trim()
    if (config.isManager(meta.userId)) meta.$send(message)
    else if (config.isEnabled('say', meta.userId)) meta.$send(`${meta.sender.nickname}: ${message}`)
  }
}
