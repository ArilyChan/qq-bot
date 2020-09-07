const mongoose = require('mongoose')
const config = require('./config/db')
mongoose.connect(config.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const MenuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  creator: {
    name: String,
    qq: String
  }
})
const Menu = mongoose.model('Menu', MenuSchema)
const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  methodOfConsumption: { type: String, default: '吃' },
  cqImage: String,
  uploader: {
    name: String,
    qq: String
  },
  menu: {
    type: mongoose.Schema.Types.ObjectId, ref: Menu
  }
})
const Recipe = mongoose.model('Recipe', RecipeSchema)

module.exports = {
  Recipe,
  Menu
}
