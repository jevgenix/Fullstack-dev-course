var http = require('http');
// create server object
http.createServer (function (resrequest, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<h1> Hello user </h1>");
    response.write("<h2> Just testing </h2>");
    response.end("<h1> Bye! </h1>");
}).listen(3031);