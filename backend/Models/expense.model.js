

const mongoose = require("mongoose");

const exoenseSchema = new mongoose.Schema({
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "trip",
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  transactionName: {
    type: String,
    require: true,
  },
  transactionAmount: {
    type: Number,
    require: true,
  },
  sessionId: {
    type: String,
  },
});

module.exports = mongoose.model("expense", exoenseSchema);
