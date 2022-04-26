#!/usr/bin/env node
// Module dependencies
const app = require("../app");
const debug = require("debug")("app:server");
const http = require("http");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// Otetaan moduuli käyttöön
const mongoose = require("mongoose");

// Määritellään yhteysosoite
const user = process.env.DB_USER;
const pwd = process.env.DB_PASS;
const uri =
  "mongodb+srv://" +
  user +
  ":" +
  pwd +
  "@cluster0.byt4i.mongodb.net/mongoosedemo?retryWrites=true&w=majority";

// Luodaan yhteys
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Tulostetaan tieto yhteyden onnistumisesta tai virheestä - huomaa syntaksi ja anonyymi funktio
db.on("error", () => console.log("Yhteysvirhe!"));

db.once("open", function () {
  console.log("Yhteys on muodostettu!");
});

// Määritellään User-niminen Schema, eli tietomalli taulukkoon tallennettavista olioista
const User = mongoose.model("User", {
  username: String,
  password: Number,
  birthday: Date,
});

// Luodaan uusi tallennettava olio
let newUser = new User({
  username: "Evgenii Smirnov",
  password: 12345678,
  birthday: "1998-03-24",
});

// Tallennetaan olio tietokantaan
newUser.save(function (err, user) {
  if (err) return console.log(err);
  console.log(newUser);
});

// Get port from environment and store in Express
const port = normalizePort(process.env.PORT || "3002");
app.set("port", port);

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

// Normalize a port into a number, string, or false
function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

// Event listener for HTTP server "error" event
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Event listener for HTTP server "listening" event
function onListening() {
  let addr = server.address();
  let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
