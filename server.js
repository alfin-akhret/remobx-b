var express = require('express')
var bodyParser = require('body-parser')
var logger = require('morgan')
var path = require('path')

app = express()

var PORT = process.env.PORT || 9999
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(__dirname))

app.get('/', function(req, res) {
	res.send(JSON.stringify({data:'hallo'}))
})

app.listen(PORT, function() {
	console.log('server is running on: ' + PORT)
})