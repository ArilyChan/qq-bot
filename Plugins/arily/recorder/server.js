const express = require('express')

const app = express()

app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
module.exports = (storage) => {
  app.get('/recent', (req, res) => {
    let recentKeys = Array.from(storage.messages.keys())
    recentKeys = recentKeys.slice(recentKeys.length - 100)
    const messages = recentKeys.map((key) => storage.messages.get(key))
    res.render('recent', {
      title: 'Recent replied messages',
      messages
    })
  })
  app.get('/test', (req, res) => {
    res.render('index', { name: 'John' })
  })
  return app
}
