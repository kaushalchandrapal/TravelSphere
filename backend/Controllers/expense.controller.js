

const Expense = require("../Models/expense.model");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

exports.addExpense = async (req, res) => {
  try {
    const { tripId, transactionName, transactionAmount } = req.body;
    const userId = req.user._id;
    if(!userId){
      res.status(401).json({error : "User not found!"})
    }
    const expense = await Expense.create({
      userId,
      tripId: tripId,
      transactionName: transactionName,
      transactionAmount: transactionAmount,
    });
    res
      .status(201)
      .json({ success: true, message: "Expense added successfully", expense });
  } catch (err) {
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

exports.getAllExpenses = async (req, res) => {
  const tripId = req.params.tripId;
  try {
    if (tripId == null) {
      res.status(404).json({ message: "Trip not found!!" });
    } else {
      const expense = await Expense.find({ tripId: tripId });
      res.status(200).json({ message: "Trips found!!", expense });
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.updateExpense = async (req, res) => {
  let expense;
  try {
    expense = await Expense.findById(req.params.id);
    if (expense == null) {
      res.status(404).json({ success: false, message: "Expense not found" });
    } else {
      if (req.body.transactionName != null) {
        expense.transactionName = req.body.transactionName;
      }
      if (req.body.transactionAmount != null) {
        expense.transactionAmount = req.body.transactionAmount;
      }
    }
    try {
      const updatedExpense = await expense.save();
      res.status(200).json({
        success: true,
        message: "Expense updated succussfully!",
        updatedExpense,
      });
    } catch (err) {
      res.status(400).json({ success: false, message: err });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
};

exports.getExpense = async (req, res) => {
  let expense;
  try {
    expense = await Expense.findById(req.params.id);
    if (expense == null) {
      res.status(404).json({ success: false, message: "Expense not found" });
    } else {
      res
        .status(200)
        .json({ success: true, message: "Expense found!", expense });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
};

exports.deleteExpense = async (req, res) => {
  let expense;
  try {
    expense = await Expense.findById(req.params.id);
    if (expense == null) {
      res.status(404).json({ success: false, message: "Expense not found!" });
    } else {
      await Expense.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({ success: true, message: "Expense deleted succussfully!" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
};

exports.payExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.body.expenseId);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: expense.transactionName,
            },
            unit_amount: expense.transactionAmount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/manageExpense`,
      cancel_url: `http://localhost:3000/cancel-Pay/${expense._id}`,
    });
    res.status(200).json({
      success: true,
      sessionUrl: session.url,
      message: "Url Sent Successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Something went wrong!",
      error: err,
    });
  }
};
