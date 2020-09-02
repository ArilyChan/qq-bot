const React = require("react");
const DefaultLayout = require("./layouts/default.jsx");
const Menu = require("./components/menu.jsx");
function HelloMessage(props) {
  const ElementsOfMessage = Object.entries(props.recipes).map(([menu,recipes]) => 
    new Menu({ menu, recipes }).render()
  );
  return (
    <DefaultLayout title={props.title}>
      <div>{ElementsOfMessage}</div>
    </DefaultLayout>
  );
}

module.exports = HelloMessage;
