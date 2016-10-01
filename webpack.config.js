module.exports = {
	entry: './app/index.js',
	output: {
		path: __dirname,
		filename: 'bundle.js',
	},
	module: {
		loaders: [
			{ 
				test: /\.js$/, 
				exclude: /node_modules/, 
				loader: 'babel-loader',
			}
		]
	},
	devServer: {
		port:9999
	},
}