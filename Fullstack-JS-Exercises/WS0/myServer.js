var http = require('http');
var fs = require("fs");

let table = `
        <table border ='2'>
            <tr>
                <td style = "background-color: yellow"> Name </td>
                <td style = "background-color: #82E0AA"> Address </td>
                <td style = "background-color: #AED6F1"> City </td>
            </tr>
            
            <tr>
                <td><a href="http://localhost:3030/helloroutes">Matti Meikäläinen</a></td>
                <td> Timotie 1, as 10 </td>
                <td> Tampere </td>
            </tr>

            <tr>
                <td><a href="http://localhost:3030/html">Maija Virtanen</a></td>
                <td> Asemtatie 12 </td>
                <td> Kiljava </td>
            </tr>
            
            <tr>
                <td><a href="http://localhost:3030/json">Jaison Jack</a></td>
                <td> In your memory </td>
            <td> With your database </td>
        </tr>
        </table>
    `;


http.createServer(function(req, response){
    
    if (req.url === "/") {
        response.writeHead(200, {'Content-type': 'text/html'});
    
        response.write("Response write is added");
        response.write("<h1> Hello again </h1>");
        
        response.write(table);
        response.end("End Server\n"); 
    }
    
    else if (req.url === "/helloroutes") {
        response.writeHead(200, { "Content-Type": "text/html"});
        
        response.write("Moikka Maailma!");
    }
    else if (req.url === "/html") {
        response.writeHead(200, {"Content-Type": "text/html"});
        var html = fs.readFileSync('./my.html')
        response.write(html);
    }
    else if (req.url === '/json') {
        response.writeHead(200, {"Content-Type": "text/json"});
        var json = require('./my.json');
        response.write(JSON.stringify(json));
    }
    
}).listen(3030);

console.log("Server running at http://127.0.0.1:3030/");