// moduulit käyttöön
const express = require("express");
const app = express();
require("dotenv").config();

const mongoose = require("mongoose");
const uri = process.env.DB_URI;
const port = 8081;

// yhdistetään tietokantaan
mongoose.conndect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const MovieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  poster: String,
});

// Määritellään Schema, eli tietomalli
const Movie = mongoose.model(
  "Movie",
  MovieSchema,
  "movies" // HUOM. Kohdistetaan skeeman operaatiot tähän kokoelmaan
);

// Tämä tarvitaan lomakedatan lukemista varten
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// luodaan reitit ja niiden toiminnallisuudet
app.get("/api/leffat", (req, res) => {
  Movie.find({}, null, { limit: 20 }, (err, results) => {
    if (err) {
      res.json("Järjestelmässä tapahtui virhe", 500);
    }
    // Muuten lähetetään tietokannan tulokset selaimelle
    else {
      res.status(200).json(results);
    }
  });
});

app.get("/api/hae/:id", (req, res) => {
  const id = req.params.id;
  Movie.findById(id, (err, results) => {
    if (err) {
      res.json("Järjestelmässä tapahtui virhe", 500);
    }
    // Muuten lähetetään tietokannan tulokset selaimelle
    else {
      res.status(200).json(results);
    }
  });
});

// Lisätään yksi leffa - POST-muuttujien lukeminen
app.post("/api/lisaa", (req, res) => {
  let nimi = req.body.title;
  let vuosi = req.body.year;
  let posteri = "https://www.lukuhetki.fi/tuotekuvat/product94037.jpg";

  const leffa = new Movie({
    title: nimi,
    year: vuosi,
    poster: posteri,
  });
  console.log(leffa);
  leffa.save();
  res.send("Lisätään leffa: " + req.body.title + " (" + req.body.year + ")");
});

/* Muokataan leffan tietoja id-numeron perusteella. Huomaa ID-arvon lukeminen */
app.put("/api/muokkaa/:id", function (req, res) {
  const id = req.params.id;

  Movie.findByIdAndUpdate(id, { title: "Tänne uusi nimi" }, (err, results) => {
    /*     Jos tietokantahaussa tapahtuu virhe, palautetaan virhekoodi myös selaimelle */
    if (err) {
      res.json("Järjestelmässä tapahtui virhe", 500);
    } else {
      /*      Muuten lähetetään tietokannan tulokset selaimelle  */
      res.json(
        "Muokattiin leffaa id:llä: " +
          req.params.id +
          " nimeltään: " +
          results.title
      );
    }
  });
});

app.delete("/api/poista/:id", (req, res) => {
  const id = req.params.id;

  Movie.findByIdAndDelete(id, (err, results) => {
    if (err) {
      console.log(err);
      res.json(
        "Tietokantajärjestelmävirhe. Yritä hetken kuluttua uudestaa...",
        500
      );
    } else if (results == null) {
      res.json("Poistetavaa dokumenttia ei löytynyt.", 200);
    } else {
      console.log(results);
      res.json("Deleted " + id + " " + results.title, 200);
    }
  });
});

app.listen(port, () => {
  console.log("Kuunnellaan porttia ", port);
});
