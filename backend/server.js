const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();
const port = 2020;
var app = express();
app.use(express.json());

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const userRouter = require("./Routes/user.routes");
const RegisterandloginRouter = require("./Routes/Registerandlogin.routes");

const connectionUrl = process.env.MONGODB_URI;

mongoose
  .connect(connectionUrl)
  .then(() => {
    console.log("Database connection successfull");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/user", userRouter);
app.use("/register", RegisterandloginRouter);
app.use("/", RegisterandloginRouter);

app.listen(port);
console.log("App is running on port: " + port);
