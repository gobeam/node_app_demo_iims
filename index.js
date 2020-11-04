const http = require('http');
const url = require('url');


let server = http.createServer((request, response) => {
	let queryObject = url.parse(request.url, true).query;

	response.writeHead(200, {'content-type' : 'text/html'});
		response.write(`<html><body><h1>Hello ${queryObject.name}, how are you????</h1>
			<p>This is profile page. His age is ${queryObject.age}.</p></body></html>`);
		response.end();
	// if(request.url == '/') {
	// 	response.writeHead(200, {'content-type' : 'text/html'});
	// 	response.write('<html><body><h1>Hello world</h1><p>This is root page</p></body></html>');
	// 	response.end();
	// } else if(request.url == '/profile') {
	// 	response.writeHead(200, {'content-type' : 'text/html'});
	// 	response.write('<html><body><h1>Hello IIMS, how are you????</h1><p>This is profile page</p></body></html>');
	// 	response.end();
	// } else {
	// 	response.writeHead(404, {'content-type': 'text/html'});
	// 	response.write('<html><body><h1>404 Page Not Found</h1></body></html>')
	// 	response.end();
	// }
});

server.listen(8000);
console.log('Server is running on port: ', 8000);


