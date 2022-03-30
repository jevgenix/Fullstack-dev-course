const express = require("express");
const app = express();

// otetaan EJS käyttöön
app.set("view engine", "ejs");

/*  Tällä pakotetaan sivupohja tuottamaan sisennettyä, kaunista HTML:ää. 
    Tuotantokäytössä asetus voi olla false jolloin sivujen koko pienenee hieman */
app.locals.pretty = true;

// .env käyttöön
require("dotenv").config();

// Mongodb moduuli ohjelmaan
const MongoClient = require("mongodb").MongoClient;

// salasana, yhteysosoite ja URI Mongodb tietokantaan
const user = process.env.DB_USER;
const pwd = process.env.DB_PASS;

const uri =
  "mongodb+srv://" +
  user +
  ":" +
  pwd +
  "@cluster0.byt4i.mongodb.net/sample?retryWrites=true&w=majority";

/* Luodaan uusi yhteysolio käyttäen edellä määriteltyä URI:a sekä tarvittavia parametreja */
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let query = {
  title: new RegExp("Potter"),
};

// Luodaan yhteys  tietokantaan nimeltä "sample_mflix" ja sieltä kokoelmaan "movies"
client.connect((err) => {
  const collection = client.db("sample_mflix").collection("movies");
  if (err) throw err;

  // Luodaan reitit ja niiden toiminnallisuudet
  app.get("/", function (req, res) {
    res.send("Hello World!");
  });

  app.get("/leffat", (req, res) => {
    collection.find(query).toArray(function (err, results) {
      console.log(results);
      res.render("./pages/leffat", { taulu: results });
    });
  });

  /*     Web-palvelimen luonti Expressin avulla */
  app.listen(3001, function () {
    console.log("Kuunnellaan porttia....3001");
  });
});
