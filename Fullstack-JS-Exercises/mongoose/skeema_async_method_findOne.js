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

// järjestys: eka skeema, sitten metodit ja vasta sen jälkeen määritellään mallin
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

  // await Kitten.find
  const kittens = await Kitten.find({ name: /^Fluffy/ });
  if (kittens.length > 0) {
    console.log(kittens);
  } else {
    console.log("Kissasi ei löydy :( ");
  }

  /*Mongodb different modules:
    Model.deleteMany()
    Model.deleteOne()
    Model.find()
    Model.findById()
    Model.findByIdAndDelete()
    Model.findByIdAndRemove()
    Model.findByIdAndUpdate()
    Model.findOne()
    Model.findOneAndDelete()
    Model.findOneAndRemove()
    Model.findOneAndReplace()
    Model.findOneAndUpdate()
    Model.replaceOne()
    Model.updateMany()
    Model.updateOne()
  */

  // more examples: https://mongoosejs.com/docs/queries.html
}
