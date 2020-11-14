// const server = require('http').createServer()
// const io = require('socket.io')(server)
// // io.on('connection', client => {
// //   client.on('event', data => { /* … */ })
// //   client.on('disconnect', () => { /* … */ })
// // })
// server.listen(process.env.CHAT_SERVER_PORT || 3004)
const io = require('socket.io')(process.env.CHAT_SERVER_PORT || 3004, {
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
});
console.log('chat server listen on port', process.env.CHAT_SERVER_PORT || 3004)

module.exports = {
  io,
  // server
}