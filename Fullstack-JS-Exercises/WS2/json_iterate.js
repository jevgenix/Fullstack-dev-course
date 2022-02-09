const json = require("./browser_files/sampledata.json");
const http = require("http");

var html = "<table border='3'>";
html += `<tr>
        <th> Name </th>
        <th> Age </th>
        <th> Company </th>
        <th> Address </th>
        </tr>`;

var data = ["name", "age", "company", "address"];

json.forEach((item) => {
  data.forEach((prop) => {
    if (prop == "name") {
      html += "<tr>" + "<td>" + item[prop] + "</td>";
    } else if (prop != "name" && prop != "address") {
      html += "<td>" + item[prop] + "</td>";
    } else {
      html += "<td>" + item[prop] + "</td>" + "</tr>";
    }
    // if you want to console.log all data
    //console.log(item[prop]);
  });
});
html += "</table>";

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(html);
    res.end();
  })
  .listen(8080);

//console.log(html);
/*
console.log(json[0].name);
for (let i = 0; i < json.length; i++) {
  for (let j = 0; j < data.length; j++) {
    console.log(json[i][data[j]]);
  }
}
*/
