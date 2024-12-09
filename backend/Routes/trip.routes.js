

const express = require("express");
const router = express.Router();
const {
  addTrip,
  getAllTrip,
  updateTrip,
  getTrip,
  deleteTrip,
} = require("../Controllers/trip.controller");
const {decodeToken} = require("../Helpers");

router.post("/add", decodeToken ,addTrip);
router.get("/", getAllTrip);
router.patch("/update/:id", updateTrip);
router.get("/get/:id", getTrip);
router.delete("/delete/:id", deleteTrip);

module.exports = router;
