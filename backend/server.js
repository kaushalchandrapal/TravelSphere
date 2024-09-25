const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();
const port = 2020;
var app = express();
app.use(express.json());

const connectionUrl = process.env.MONGODB_URI;

mongoose
  .connect(connectionUrl)
  .then(() => {
    console.log("Database connection successfull");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port);
console.log("App is running on port: " + port);
