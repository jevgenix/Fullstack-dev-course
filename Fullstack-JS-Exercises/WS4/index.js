// WS4
const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  // if we want to send static file instead of written message
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/jsondata", (req, res) => {
  // this is how we output json data in browser
  const data = require("./exampledata2.json");
  // res.json(data);
  // we can also output it as a table

  let results = "<table border='1'>";
  for (let i = 0; i < data.length; i++) {
    results +=
      "<tr>" +
      "<td>" +
      data[i].Name +
      "</td>" +
      "<td>" +
      data[i].Email +
      "</td>" +
      "<td>" +
      data[i].Date +
      "</td>" +
      "<td>" +
      data[i].Company +
      "</td>" +
      "</tr>";
  }
  results += "</table>";
  res.send(results);
});

app.get("/list", (req, res) => {
  // we can also send txt files to browser
  res.sendFile(__dirname + "/public/exampledata.txt");
});

app.get("/add", (req, res) => {
  const data = require("./exampledata2.json");
  data.push({
    Name: "Evgenii Smirnov",
    Company: "Laurea",
    Email: "evgenii@gmail.com",
    Date: "30/3/2022 \r\n",
  });
  let jsonStr = JSON.stringify(data);

  fs.writeFile("exampledata2.json", jsonStr, (err) => {
    if (err) throw err;
    console.log("It's  saved!");
  });
  res.send(
    "Saved the data to a file. Browse to the /details to see the contents of the file"
  );
});

app.get("/adduser", function (req, res) {
  res.sendFile(__dirname + "/public/adduser.html");
});

app.post("/adduser", function (req, res) {
  let data = require("./exampledata2.json");
  data.push({
    Name: req.body.name,
    Company: req.body.company,
    Email: req.body.email,
    Date: new Date().toLocaleDateString("fi"),
  });
  let jsonStr = JSON.stringify(data);
  fs.writeFile("exampledata2.json", jsonStr, (err) => {
    if (err) throw err;
    console.log("It's saved!");
  });
  res.send(
    "Saved the data to a file. Browse to the /details to see the contents of the file"
  );
});

app.get("/details", (req, res) => {
  const data = require("./exampledata2.json");

  // parse the results into a variable
  let results = "<table border='1'>";
  for (let i = 0; i < data.length; i++) {
    results +=
      "<tr>" +
      "<td>" +
      data[i].Name +
      "</td>" +
      "<td>" +
      data[i].Email +
      "</td>" +
      "<td>" +
      data[i].Company +
      "</td>" +
      "</tr>";
  }
  results += "</table>";
  res.send(results);
});

app.get("*", (req, res) => {
  res.send("Cant find the requested page", 404);
});

app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});
