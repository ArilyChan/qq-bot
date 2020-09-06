const React = require("react");
const Recipe = require("./recipe.jsx");
class Menu extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // const ElementsOfRecipes = this.props.recipes.map((recipe) =>
    //   new Recipe(recipe).render()
    // );
    return (
      <div key={this.props.menu}>
        <h2>{this.props.menu}:</h2>
        <ul>
          {this.props.recipes.map((recipe) => <Recipe recipe={recipe} key={`recipe-${this.props.menu}-${recipe}`}/>) }
        </ul>
      </div>
    );
  }
}
module.exports = Menu;
