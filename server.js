var morgan  = require('morgan');
var http    = require('http');
var express = require('express');
var path    = require('path');
var app		= express();

//for logging
app.use(morgan('combined'));

//public static file serving
app.use(express.static('public'));

//passing index.html file
app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/index.html'));
});

function serve(ip, port)
{
	//http.createServer(app).listen(port, ip);
	app.listen(port, ip);
	console.log('Express server is running at http://'+ip+':'+port+'/');
}

serve('104.131.14.10', 3000);
serve('104.131.14.10', 3001);
serve('104.131.14.10', 3002);
