import propTypes from 'prop-types'
const React = require('react')
const DefaultLayout = require('./layouts/default.jsx')
const Menu = require('./components/menu.jsx')
function HelloMessage (props) {
  return (
    <DefaultLayout title={props.title}>
      {Object.entries(props.recipes).map(([menu, recipes]) =>
        <Menu menu={menu} recipes={recipes} key={`menu-${menu}`} />
      )}
    </DefaultLayout>
  )
}
HelloMessage.propTypes = {
  title: propTypes.stirng,
  recipes: propTypes.array
}
module.exports = HelloMessage
