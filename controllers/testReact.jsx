const React = require('react')
const ReactDOM = require('react-dom')


class TestField extends React.Component {
  render() {
    return (
        <div>
          Test React
        </div>
    )
  }
}

function renderTest(rootDiv) {
  console.log("rendered");
  ReactDOM.render(<Test/>, document.getElementById(rootDiv))
}

console.log("hit file")
renderTest("testRoot")
