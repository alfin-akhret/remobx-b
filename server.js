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

// Include server routes as a middleware
app.use(function(req, res, next) {
 	require('./server/app')(req, res, next);
});


// Do "hot-reloading" of express stuff on the server
// Throw away cached modules and re-require next time
// Ensure there's no important state in there!
const watcher = chokidar.watch('./server');

watcher.on('ready', function() {
	watcher.on('all', function() {
		console.log("Clearing /server/ module cache from server");
		Object.keys(require.cache).forEach(function(id) {
		  	if (/[\/\\]server[\/\\]/.test(id)) delete require.cache[id];
		});
	});
});

// Do "hot-reloading" of react stuff on the server
// Throw away the cached client modules and let them be re-required next time
compiler.plugin('done', function() {
	console.log("Clearing /client/ module cache from server");
	Object.keys(require.cache).forEach(function(id) {
		if (/[\/\\]client[\/\\]/.test(id)) delete require.cache[id];
	});
});


app.listen(PORT, function() {
	console.log('server is running on: ' + PORT)
})