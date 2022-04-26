const express = require("express");
const app = express();

// Tämä tarvitaan lomakedatan lukemista varten
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

/* Luodaan reitit ja niiden toiminnallisuudet */

// Tulostetaan kaikki leffat
app.get("/api/leffat", function (req, res) {
  res.send("Tulostetaan kaikki leffat.");
});

// Lisätään yksi leffa - huomaa POST-muuttujien lukeminen
app.post("/api/lisaa", function (req, res) {
  res.send("Lisätään leffa: " + req.body.title + " (" + req.body.year + ")");
});

// Muokataan leffan tietoja id-numeron perusteella. Huomaa ID-arvon lukeminen
app.put("/api/muokkaa/:id", function (req, res) {
  res.send("Muokataan leffaa id:llä: " + req.params.id);
});

// Poistetaan leffa id:n perusteella. Huomaa ID-arvon lukeminen
app.delete("/api/poista/:id", function (req, res) {
  res.send("Poistetaan leffa id:llä: " + req.params.id);
});

// Web-palvelimen luonti Expressin avulla
app.listen(8081, function () {
  console.log("Kuunnellaan porttia 8081!");
});
