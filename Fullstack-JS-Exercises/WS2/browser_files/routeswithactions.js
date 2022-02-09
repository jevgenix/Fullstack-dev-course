const http = require("http");
const fs = require("fs");

http
  .createServer(function (req, res) {
    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write("<h1> Nothing to see here </h1>");
      res.end();
    }
    if (req.url === "/frontpage") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write("<h1> Hello, world! </h1>");
      const frontpage = fs.readFileSync("./frontpage.html");
      res.write(frontpage);
      res.end();
    }
    if (req.url === "/contact") {
      res.writeHead(200, { "Content-Type": "text/html" });
      const contact = fs.readFileSync("./contact.html");
      res.write(contact);
      res.end();
    }
    if (req.url === "/plaintext") {
      var text_file = fs.readFileSync(
        // dont get it how access to file from main folder
        // for some reason this not working
        //"/Fullstack-JS-Exercises/WS2/text_files/example.txt"
        "./example.txt"
      );
      res.write(text_file);
      res.end();
    }
    if (req.url === "/json") {
      res.writeHead(200, { "Content-Type": "text/json" });
      const json = require("./sampledata.json");
      res.write(JSON.stringify(json));
      res.end();
    }
  })
  .listen(3030);
