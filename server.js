var bodyParser = require('body-parser'),
	express    = require('express'),
	mongoose   = require('mongoose'),
	logger     = require('morgan'),
	fs         = require('fs'),
	//_          = require('underscore'),
	app        = express(),
	server     = require('http').createServer(app),
	io         = require('socket.io')(server),
	port 			 = process.env.PORT || 3000;
//everything above is for the dependencies that needs to be required in the server file


//instead of app user serve and listen on 3000
server.listen(port, function(){
	console.log("the server is on 3000");
});

// server public files with express
app.use(express.static(__dirname + '/public'));

// logger on dev
app.use(logger('dev'));

// on localhost base
app.get('/',function(req,res){
	//load public for css/js test
});

app.get('/one',function(req,res){
  res.sendFile((__dirname+'/public/oneplayer.html'));
});
app.get('/two',function(req,res){
  res.sendFile((__dirname+'/public/twoplayer.html'));
});

// Going to use FS to connect all of our controllers vs express.router
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./controllers/' + file);
      route.controller(app);
  }
});

require('./socket.js')(app, io);
