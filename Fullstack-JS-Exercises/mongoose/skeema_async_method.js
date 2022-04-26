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
  // console.log("Yhteys on muodostettu!");

  // kittyShema
  const kittySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
  });

  // methods must be added to the schema before compiling it with mongoose.model()

  kittySchema.methods.speak = function speak() {
    const greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  };

  const Kitten = mongoose.model("Kitten", kittySchema);

  // uusi kitten olio ja sen nimen tulostus konsoliin
  const silence = new Kitten({ name: "Silence " });
  console.log(silence.name); // Silence

  const fluffy = new Kitten({ name: "Fluffy" });

  fluffy.speak(); // "Meow name is Fluffy"
  silence.speak(); // "Meow name is Silence"
}
