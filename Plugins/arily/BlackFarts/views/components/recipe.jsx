const React = require("react");

class Recipe extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(this.props)
    return (
      <li key={this.props}>
        {this.props}
      </li>
    );
  }
}
module.exports = Recipe;
