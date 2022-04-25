// moduuli käyttöön
require("dotenv").config();
const mongoose = require("mongoose");

// osoite
const user = process.env.DB_USER;
const pwd = process.env.DB_PASS;
const uri =
  "mongodb+srv://" +
  user +
  ":" +
  pwd +
  "@cluster0.byt4i.mongodb.net/mongoosedemo?retryWrites=true&w=majority";

// yhteys
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

// tieto yhteyden onnistumisesta/virheestä

db.on("error", () => console.log("Yhteysvirhe:"));
db.once("open", () => console.log("Yhteys on muodostettu!"));

const kittySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
});

// compiling kittySchema into a Model

const Kitten = mongoose.model("Kitten", kittySchema);

// uusi kitten olio, tulostus konsoliin

const silence = new Kitten({ name: "Silence" });
console.log(silence.name);
