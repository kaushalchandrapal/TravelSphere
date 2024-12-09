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
  role: {
    type: String,
    enum: ["user", "admin"], // Role can only be "user" or "admin"
    default: "user", // Default role
  },
});

module.exports = mongoose.model("User", userSchema);
