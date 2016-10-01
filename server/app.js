var express =  require('express');

const app = express.Router();

// express routes
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

module.exports = app;