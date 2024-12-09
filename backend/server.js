const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
var morgan = require("morgan");
require("dotenv").config();
const port = 5001;
var app = express();
const userController = require("./Controllers/Registerandlogin.controller");
app.use(express.json());
app.use(express.static(`Assets`));

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

//Routes
const adminRouter = require("./Routes/admin.routes");
const postRouter = require("./Routes/post.routes");
const userRouter = require("./Routes/user.routes");
const liveUpdateRouter = require("./Routes/liveUpdate.routes");
const tripRouter = require("./Routes/trip.routes");
const expenseRouter = require("./Routes/expense.routes");
const planRouter = require("./Routes/plan.routes");
const RegisterandloginRouter = require("./Routes/Registerandlogin.routes");

const connectionUrl = process.env.MONGO_CONNECTION_URL;

mongoose
  .connect(connectionUrl)
  .then(() => {
    console.log("Database connection successfull");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.use(morgan("combined"));
app.use("/admin", adminRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);
app.use("/liveupdate", liveUpdateRouter);
app.use("/trip", tripRouter);
app.use("/expense", expenseRouter);
app.use("/plan", planRouter);
app.use("/", RegisterandloginRouter);

app.use((error, req, res, next) => {
  console.error(error);
});

app.listen(port);
console.log("App is running on port: " + port);
