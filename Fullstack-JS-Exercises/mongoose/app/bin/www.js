#!/usr/bin/env node

// Module dependencies
const app = require("../app");
const debug = require("debug")("app:server");
const http = require("http");
require("dotenv").config();

// moduulit käyttöön
const mongoose = require("mongoose");
// yhteysosoite
const user = process.env.DB_USER;
const pwd = process.env.DB_PASS;
const uri =
  "mongodb+srv://" +
  user +
  ":" +
  pwd +
  "@cluster0.byt4i.mongodb.net/mongoosedemo?retryWrites=true&w=majority";

// luodaan yhteys
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Tulostetaan tieto yhteyden onnistumisesta tai virheestä - huomaa syntaksi ja anonyymi funktio

db.on("error", () => console.log("Yteysvirhe!"));

db.once("open", () => {
  console.log("Yhteys on muodostettu!");
});

// määritellään user-niminen Schema, eli tietomalli taulukkoon tallennettavista olioista

const User = mongoose.model("User", {
  username: String,
  password: Number,
  birthday: Date,
});

const newUser = new User({
  username: "Evgenii Smirnov",
  password: 12345678,
  birthday: "1998-3-24",
});

// tallennetaan olio tietokantaan
newUser.save((err, user) => {
  if (err) return console.log(err);
  console.log(newUser);
});

// Get port from environment and store in Express
const port = normalizePort(process.env.PORT || "3002");

// create http server
const server = http.createServer(app);

// Listen on provided port, on all network interfaces
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

// Normalize a port into a number, string, or boolean: false
function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

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

// event listener for http server "listening" event
function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
