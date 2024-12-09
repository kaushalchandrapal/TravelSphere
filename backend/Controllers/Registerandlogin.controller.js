const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("./../Models/Registerandlogin.model");
const app = express();

const JWT_SECRET = "secret_key";

app.use(express.json());
app.use(cors());

const registerUser = async (req, resp) => {
  try {
    const {emailid} = req.body;
    const image =
		'http://localhost:5001/Images/' + req.file.filename;

    let users = await User.findOne({emailid});
    if (users) {
      return resp.status(401).send( "User Already exists!");
    } else {
      const newusers = await User.create({...req.body , profilePic : image});
      // const result = await newusers.save();
      return resp.send(newusers);
    }
  } catch (error) {
    console.log(error);
    resp.json({ error });
  }
};

const loginUser = async (req, resp) => {
  try {
    if (req.body.pass && req.body.emailid) {
      let users = await User
        .findOne({ emailid: req.body.emailid, pass: req.body.pass })
        .select("-pass");
      if (users) {
        const token = jwt.sign(
          { userId : users._id , user:users, emailid: users.emailid, role: users.role },
          JWT_SECRET,
          { expiresIn: "24h" }
        );

        resp.send({
          message: "Login successful",
          token: token,
          user: users,
        });
      } else {
        console.log("invalid credentials")
        resp.status(401).send("Invalid email or password");
      }
    } else {
      console.log("Email and password are required");
      resp.status(400).send("Email and password are required");
    }
  } catch (error) {
    console.log(error);
    resp.json({ error });
  }
};

app.post("/register", registerUser);
app.post("/login", loginUser);

module.exports = {
  registerUser,
  loginUser,
};
