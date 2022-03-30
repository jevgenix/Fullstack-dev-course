var express = require("express");
var app = express();

/* otetaan EJS käyttöön */
app.set("view engine", "ejs");
var mongo = require("./modules/mongo");

// Luodaan reitit ja niiden toiminnallisuudet

app.get("/", function (req, res) {
  var result = mongo.getData(function (err, result) {
    //handle err, then you can render your view
    console.log(result.length);
    res.render("pages/index", { collection: result });
  });
});

/*     Web-palvelimen luonti Expressin avulla */
app.listen(3001, function () {
  console.log("Kuunnellaan porttia....3001");
});
