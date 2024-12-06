

const mongoose = require("mongoose");

const tripSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  tripName: {
    type: String,
    require: true,
  },
  tripDescription: {
    type: String,
    require: true,
  },
  tripDate: {
    type: String,
    require: true,
  },
  initialBudget: {
    type: Number,
    require: true,
  },
  totalExpense: {
    type: Number,
  },
});

module.exports = mongoose.model("trip", tripSchema);
