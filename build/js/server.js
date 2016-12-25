var http = require('http');

var server = http.createServer(function(request, response){
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Done.');
	request.resume();
});

server.listen(9000);

console.log('Server running at http://localhost:9000/');