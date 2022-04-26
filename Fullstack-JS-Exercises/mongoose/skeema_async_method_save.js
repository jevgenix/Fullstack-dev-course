// moduuli käyttöön
require("dotenv").config();
const mongoose = require("mongoose");

// db uri, pwd, user
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

  /* Määritellään kittySchema-niminen Schema, huomaa myös kentän validaattorit*/
  const kittySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
  });

  /* methods must be added to the schema before compiling it with mongoose.model() */
  kittySchema.methods.speak = function speak() {
    const greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  };

  /* The next step is compiling kittySchema- schema into a Model. */
  const Kitten = mongoose.model("Kitten", kittySchema);

  /* Luodaan uusi kitten olio ja tulostetaan sen nimi konsoliin */
  const silence = new Kitten({ name: "Silence" });
  console.log(silence.name); // 'Silence'
  await silence.save();
  const fluffy = new Kitten({ name: "Fluffy" });
  fluffy.speak(); // "Meow name is Fluffy"
  await fluffy.save();
}
