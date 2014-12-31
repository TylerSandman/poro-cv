var express = require('express')
var app = express();

app.set('port', (process.env.PORT || 8080))
app.set('view engine', 'jade')
app.set('views', (__dirname + '/views'))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
    response.render('index')
})

app.post('/', function(request, response) {
	response.send("Processed!")
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
