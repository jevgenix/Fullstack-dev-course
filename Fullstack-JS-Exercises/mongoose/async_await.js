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

main().catch((err) => console.log(err));

/* Luodaan async funktio main()*/
async function main() {
  const aika = 2000;
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), aika);
  });
  /* The function execution “pauses” and resumes when the promise settles, with result becoming its result (= "done!")  */
  let result = await promise;

  console.log(result + " ...in " + aika + " msec"); // "done!"
}
