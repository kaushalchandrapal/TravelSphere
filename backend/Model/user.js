const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String, default: "" },
  location: { type: String, default: "" },
  travelStyle: { type: String, default: "" },
  favoriteDestinations: { type: [String], default: [] },
  profileImage: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);