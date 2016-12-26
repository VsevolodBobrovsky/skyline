var express = require('express');
var server = express();

server.use('/', express.static(__dirname + '/build'));
server.listen(8080);

server.post('/done', function(req, res){
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.end('OK');
});