/* Tuodaan moduuli ohjelmaan */
const MongoClient = require("mongodb").MongoClient;

/* Haetaan ympäristömuuttujat .env tiedostosta */
require("dotenv").config();

/* console.log(process.env); */
var user = process.env.DB_USER;
var pwd = process.env.DB_PASS;

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

/* Luodaan yhteys ja tulostetaan tieto virheestä tai onnistumisesta virhetiedot palaututuvat err muuttujaan, hakujen tulokset r-muuttujaan */

client.connect(function (err, r) {
  if (err) throw err;
  else console.log("Connected!");

  // Suljetaan tietokantayhteys
  client.close();
  console.log("Disconnected");
});
