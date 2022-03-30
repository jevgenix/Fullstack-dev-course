const express = require("express");
const app = express();

require("dotenv").config();

const MongoClient = require("mongodb").MongoClient;

/* console.log(process.env); */
var user = process.env.DB_USER;
var pwd = process.env.DB_PASS;

const uri =
  "mongodb+srv://" +
  user +
  ":" +
  pwd +
  "@cluster0.byt4i.mongodb.net/sample_mflix?retryWrites=true&w=majority";

/* Luodaan uusi yhteysolio käyttäen edellä määriteltyä URI:a sekä tarvittavia parametreja */
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var query = {
  title: new RegExp("Jedi"),
};

client.connect((err) => {
  const collection = client.db("sample_mflix").collection("movies");
  if (err) throw err;

  // luodaan reitit ja niiden toiminnallisuudet
  app.get("/", function (req, res) {
    res.send("Hi there! Try this link => localhost:3001/leffat");
  });
  app.get("/leffat", (req, res) => {
    collection.find(query).toArray(function (err, results) {
      console.log(results);
      res.json(results);
    });
  });
  // Web-palvelimen luonti Expressin avulla
  app.listen(3001, function () {
    console.log("Kuunnellaan porttia...3001");
  });
});
