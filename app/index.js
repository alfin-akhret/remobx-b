import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'

// required by webpack-hot-middleware
if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(
	<App />, document.getElementById('app')
)

