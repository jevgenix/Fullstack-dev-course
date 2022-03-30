//WS5
const express = require("express");
const app = express();

// set the view engine to ejs
app.set("view engine", "ejs");

const data = {
  users: [
    { name: "John", age: 25 },
    { name: "Mike", age: 42 },
    { name: "Samantha", age: 51 },
  ],
};

app.get("/users", (req, res) => {
  res.render("pages/users", data);
});

app.get("/", (req, res) => {
  res.render("pages/index", {
    heading: "This was passed from the JS file",
    content: "Lorem Ipsum...",
    footer: "Here is the new footer",
  });
});

app.listen(8081);

console.log("8081 is the magic port");
