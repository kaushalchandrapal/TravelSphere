const express = require("express");
const cors = require("cors");
const user = require('../Models/Registerandlogin.model');
const app = express();

app.use(express.json());
app.use(cors());

const registerUser = async (req, resp) => {
  let users = await user.findOne(req.body).select("emailid");
  if (users) {
    resp.send("User already exists");
  } else {
    let newusers = new user(req.body);
    let result = await newusers.save();
    resp.send(result);
  }
};

const loginUser = async (req, resp) => {
  if (req.body.pass && req.body.emailid) {
    let users = await user.findOne(req.body).select("-pass");
    if (users) {
      resp.send(users);
    } else {
      resp.send("User not found");
    }
  }
};

app.post("/register", registerUser);
app.post("/login", loginUser);

module.exports = {
  registerUser,
  loginUser
};