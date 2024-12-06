const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  emailid: { type: String, unique: true, required: true },
  pass: String,
  userName: {
    type: String,
  },
  profilePic: {
    type: String,
  },
  socialMediaHandle: {
    type: String,
  },
  userBio: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
