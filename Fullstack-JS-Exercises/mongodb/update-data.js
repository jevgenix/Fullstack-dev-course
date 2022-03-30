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

const client = new MongoClient(uri);
/* The database to be used */
const dbName = "test";

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    /*        Use the collection "people" */
    const col = db.collection("people");

    let personDocument = {
      name: { first: "Iivo", last: "Niskanen" },
      birth: new Date(1999, 11, 11),
      death: new Date(2100, 1, 7),
      contribs: ["Peltonen", "15 km vapaalla", "Pekingin Olymipialaiset"],
      views: 1200,
    };

    /*      Insert a single document, wait for promise so we can read it back */
    const p = await col.insertOne(personDocument);
    /*      Find one document */
    const myDoc = await col.findOne();
    console.log(myDoc);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
