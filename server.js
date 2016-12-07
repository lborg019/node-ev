/*var morgan  = require('morgan');
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

serve('127.0.0.1', 3000);
serve('127.0.0.1', 3001);
serve('127.0.0.1', 3002);
*/

require('rootpath')();
var morgan  = require('morgan');
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');
var http = require('http');
var httpProxy = require('http-proxy');
 
app.use(morgan('combined'));//for logging
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));
 
// use JWT auth to secure the api
app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));
 
// routes
app.use('/login', require('./controllers/login.controller'));
app.use('/register', require('./controllers/register.controller'));
app.use('/app', require('./controllers/app.controller'));
app.use('/api/users', require('./controllers/api/users.controller'));
app.use('/api/elections', require('./controllers/api/election.controller'));
 
// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});
 
// start server
/*var server = app.listen(3000, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});*/

function serve(ip, port)
{
	http.createServer(app).listen(port, ip);
	//app.listen(port, ip);
	console.log("Express running on: "+ip+"port: "+port);
}

serve('104.131.14.10', 3000);
serve('104.131.14.10', 3001);
serve('104.131.14.10', 3002);
