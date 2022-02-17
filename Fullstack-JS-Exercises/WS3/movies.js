// read json data from web server, and parse it as html table code
// we could use forEach, but in this example I prefered more using for loop

const axios = require("axios");
const express = require("express");
const app = express();

let html = "<table border = '3'>";
html += `<tr>
            <th> Title </th>
            <th> Year </th>
            <th> Type </th>
            <th> ImdbID </th>
        </tr>`;

const promise = axios
  .get("http://www.omdbapi.com/?s=star+wars&apikey=55108795")
  .then((response) => {
    const movies = response.data;

    //console.log(movies.Search.length);

    for (let i = 0; i < movies.Search.length; i++) {
      html += "<tr><td>" + movies.Search[i].Title + "</td>";
      html += "<td>" + movies.Search[i].Year + "</td>";
      html += "<td>" + movies.Search[i].Type + "</td>";
      html += "<td>" + movies.Search[i].imdbID + "</td></tr>";
    }
    html += "</table>";
  });

app.get("/", (req, res) => {
  res.send(html);
});

app.listen(8081, () => {
  console.log("Example app listening on port 8081!");
});
