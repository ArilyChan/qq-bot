// import { App, Server } from 'koishi-core'
// import { Logger, Time } from 'koishi-utils'

const { App, Server } = require('koishi-core')
const { Time, Logger } = require('koishi-utils')

App.defaultConfig.retryInterval = 5 * Time.second

const logger = new Logger('web-chat')

module.exports = class WsClient extends Server {
  constructor (...args) {
    super(...args)
    this.io = require('./server.js').io
  }

  async __listen (bot) {
    const db = await require('sb-plugin-auth/db')({})
    const chat = this.io.of('/chat')
    chat.on('connection', socket => {
      socket.on('join-room', ({ room }) => {
        if (!room) return
        const clients = chat.sockets
        const privateChat = clients[room]
        logger.info(`${socket.id} joined ${room}`)
        socket.join(room)
        socket.emit('joined-room', { room, type: privateChat ? 'private' : 'group' })
      })
      socket.on('client-message', async (data) => {
        let { room, message, messageId, user } = data
        if (!user) user = {}
        if (!room || !message) return
        if (user.token && user.token !== '') {
          const rec = await db.getStat(user.token)
          if (rec.qq && rec.status === 'authenticated') user.id = rec.qq
        }
        messageId = messageId || `${socket.id}-${room}-${new Date().getTime()}`

        const clients = chat.sockets
        const p = clients[room]
        const privateChat = p !== undefined

        const meta = this.prepare({
          groupId: room.toString(),
          selfId: -1,
          userId: user.id || socket.id,
          messageType: 'group',
          postType: 'message',
          messageId,
          message,
          rawMessage: message,
          sender: {
            age: 0,
            area: '',
            level: '',
            card: user.groupNickname || user.id || socket.id,
            nickname: user.name || user.id || socket.id,
            role: user.role || 'member',
            sex: 'unknown',
            title: '',
            userId: user.id || socket.id
          }
        })
        const broadcastMessage = {
          ...data,
          user: {
            id: user.id || socket.id,
            name: user.name
          }
        } 
        if (!privateChat) socket.broadcast.to(room).emit('client-message', broadcastMessage)
        else p.emit('client-message', broadcastMessage)
        this.dispatch(meta)
      })
    })
    bot.ready = true
  }

  async _listen () {
    await Promise.all(this.bots.map(bot => this.__listen(bot)))
  }

  _close () {
    logger.debug('websocket client closing')
  }
}
