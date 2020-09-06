const React = require('react')

class Recipe extends React.Component {
  render () {
    // console.log(this.props)
    return (
      <li key={this.props.recipe} onClick={() => alert('hi')}>
        {this.props.recipe}
      </li>
    )
  }
}
module.exports = Recipe
