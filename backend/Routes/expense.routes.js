

const express = require("express");
const router = express.Router();
const {
  addExpense,
  getAllExpenses,
  updateExpense,
  getExpense,
  deleteExpense,
  payExpense,
} = require("../Controllers/expense.controller");
const {decodeToken} = require("../Helpers");

router.post("/add", decodeToken ,addExpense);
router.get("/:tripId", getAllExpenses);
router.patch("/update/:id", updateExpense);
router.delete("/delete/:id", deleteExpense);
router.get("/get/:id", getExpense);
router.post("/pay", payExpense);

module.exports = router;
