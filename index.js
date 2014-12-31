var express = require('express')
var busboy = require('connect-busboy')
var fs = require('fs')
var exec = require('child_process').exec
var app = express();

app.set('port', (process.env.PORT || 8080))
app.set('view engine', 'jade')
app.set('views', (__dirname + '/views'))
app.use(express.static(__dirname + '/public'))
app.use(busboy())

var cascadeFile = __dirname + '/public/banana_classifier.xml'

function detectPoro(request, response, path){
    cv.readImage(path , function(err, im){
        im.detectObject(cascadeFile, {neighbors: 2, scale: 2}, function(err, objects){
            var detected = false
            console.log(objects)
            if (objects.length > 0){
                detected = true
            }
            response.writeHead(200, { "Connection": "close" })
            response.end(JSON.stringify({"detected" : detected}))
        })
    })

function detectPoros(request, response, path){

	child = exec('python /home/ubuntu/poro-cv/public/recognizer.py ' + path,
	function (error, stdout, stderr) {
		if (error !== null) {
			console.log('exec error: ' + error);
		}
		response.writeHead(200, { 'Connection': 'close' });
		response.end(stdout);
});
}

app.get('/', function(request, response) {
    response.render('index')
})

app.post('/process', function(request, response) {
	request.pipe(request.busboy)
	
	//Upload request
	request.busboy.on('file', function(fieldname, file, filename){
		console.log("Uploading: " + filename)
		var path = __dirname + '/public/uploads/' + filename
		fstream = fs.createWriteStream(path)
		file.pipe(fstream)
		fstream.on('close', function(){
			console.log("Processing: " + filename)
			detectPoros(request, response, path)
		})
	})
	
	//Local processing request
	request.busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
	
		if (fieldname !== 'text') return
		console.log("Processing: " + val)
		detectPoros(request, response, val)
	})
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
