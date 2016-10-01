var express = require('express')
var bodyParser = require('body-parser')
var logger = require('morgan')
var path = require('path')
var chokidar = require('chokidar');

app = express()

var PORT = process.env.PORT || 9999
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')));


// webpack
(function() {
	// Step 1: Create & configure a webpack compiler
	var webpack = require('webpack');
	var webpackConfig = require('./webpack.config');
	var compiler = webpack(webpackConfig);

	// Step 2: Attach the dev middleware to the compiler & the server
	app.use(require("webpack-dev-middleware")(compiler, {
		noInfo: true, publicPath: webpackConfig.output.publicPath
	}));

	// Step 3: Attach the hot middleware to the compiler & the server
	app.use(require("webpack-hot-middleware")(compiler, {
		log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
	}));
})();

// Include server routes as a middleware
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(PORT, function() {
	console.log('server is running on: ' + PORT)
})