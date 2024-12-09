const Trip = require("../Models/trip.model");
const Expense = require("../Models/expense.model");

exports.addTrip = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const trip = await Trip.create({
      userId: user._id,
      tripName: req.body.tripName,
      tripDescription: req.body.tripDescription,
      tripDate: req.body.tripDate,
      initialBudget: req.body.initialBudget,
      totalExpense: req.body.totalExpense,
    });
    res
      .status(201)
      .json({ success: true, message: "Trip Created Successfully", trip });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err });
  }
};

exports.getAllTrip = async (req, res) => {
  try {
    const user = req.user;
    const trips = await Trip.find({userId : user._id});
    const expenseMap = {};
    const tripIds = trips.map((trip) => trip._id);
    const expenses = await Expense.find({ tripId: { $in: tripIds } });
    expenses.forEach((expense) => {
      if (!expenseMap[expense.tripId]) {
        expenseMap[expense.tripId] = [];
      }
      expenseMap[expense.tripId].push(expense);
    });
    trips.forEach((trip) => {
      const tripExpenses = expenseMap[trip._id] || [];
      const total = tripExpenses.reduce((total, expense) => {
        return total + expense.transactionAmount;
      }, 0);
      trip.totalExpense = total;
    });
    await Promise.all(trips.map((trip) => trip.save()));
    res
      .status(200)
      .json({ success: true, message: "All trips found!!", trips });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateTrip = async (req, res) => {
  let trip;
  try {
    const trip = await Trip.findById(req.params.id);
    if (trip === null) {
      res.status(404).json({ message: "Trip not found" });
    } else {
      if (req.body.tripName != null) {
        trip.tripName = req.body.tripName;
      }
      if (req.body.tripDescription != null) {
        trip.tripDescription = req.body.tripDescription;
      }
      if (req.body.tripDate != null) {
        trip.tripDate = req.body.tripDate;
      }
      if (req.body.initialBudget != null) {
        trip.initialBudget = req.body.initialBudget;
      }
      if (req.body.totalExpense != 0) {
        trip.totalExpense = req.body.totalExpense;
      }
      try {
        const updateTrip = await trip.save();
        res.status(200).json({
          success: true,
          message: "Trip updated successfully",
          updateTrip,
        });
      } catch (err) {
        res.status(400).json({ success: false, message: err });
      }
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
};

exports.getTrip = async (req, res) => {
  let trip;
  try {
    trip = await Trip.findById(req.params.id);
    if (trip === null) {
      res.status(404).json({ message: "Trip not found" });
    } else {
      res.status(200).json({ message: "Trip found!!", trip });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteTrip = async (req, res) => {
  let trip;
  try {
    trip = await Trip.findById(req.params.id);
    if (trip === null) {
      res.status(404).json({ success: false, message: "Trip not found" });
    } else {
      await Trip.findByIdAndRemove(req.params.id);
      res
        .status(200)
        .json({ success: true, message: "Trip deleted succussfully" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
};
