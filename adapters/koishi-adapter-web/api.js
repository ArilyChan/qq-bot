const kk = require('koishi-core')
const { Bot, Session } = kk
const { io } = require('./server')
const chat = io.of('/chat')

Bot.prototype.sendGroupMsg = async function (groupId, message, autoEscape = false) {
  if (!message) return
  const session = this.createSession('group', 'group', groupId, message)
  if (this.app.bail(session, 'before-send', session)) return
  chat.to(groupId).emit('client-message', {
    room: groupId,
    user: {
      id: session.selfId,
      name: this.name
    },
    message
  })
  // const { messageId } = await this.get('send_group_msg', { groupId, message: session.message, autoEscape })
  // session.messageId = messageId
  this.app.emit(session, 'send', session)
  return -1
}

Bot.prototype.sendGroupMsgAsync = function (...args) {
  return this.sendGroupMsg(...args)
}

Bot.prototype.sendPrivateMsg = async function (userId, message, autoEscape = false) {
  if (!message) return
  const session = this.createSession('private', 'user', userId, message)
  if (this.app.bail(session, 'before-send', session)) return
  chat.to(userId).emit('client-message', {
    target: userId,
    user: {
      id: session.selfId,
      name: this.name
    },
    message
  })
  this.app.emit(session, 'send', session)
  return -1
}

Bot.prototype.sendPrivateMsgAsync = function (...args) {
  return this.sendPrivateMsg(...args)
}

Session.prototype.$send = async function $send (message, autoEscape = false) {
  if (!message) return
  let ctxId
  // eslint-disable-next-line no-cond-assign
  const ctxType = (ctxId = this.groupId) ? 'group' : (ctxId = this.userId) ? 'user' : null

    ctxType === 'group'
      ? await this.$bot.sendGroupMsg(ctxId, message, autoEscape)
      : await this.$bot.sendPrivateMsg(ctxId, message, autoEscape)
    return

}
