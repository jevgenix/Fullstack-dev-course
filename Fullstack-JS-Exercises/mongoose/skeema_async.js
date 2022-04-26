require("dotenv").config();

const mongoose = require("mongoose");

// db tiedot/osoite
const user = process.env.DB_USER;
const pwd = process.env.DB_PASS;
const uri =
  "mongodb+srv://" +
  user +
  ":" +
  pwd +
  "@cluster0.byt4i.mongodb.net/mongoosedemo?retryWrites=true&w=majority";

// yhteys
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Yhteys on muodostettu!");

  const kittySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
  });

  // kittySchema-skeeman kääntäminen malliksi
  const Kitten = mongoose.model("Kitten", kittySchema);

  // Luodaan uusi kitten olio ja tulostetaan sen nimi konsoliin
  const silence = new Kitten({ name: "Silence" });
  console.log(silence.name);
}
