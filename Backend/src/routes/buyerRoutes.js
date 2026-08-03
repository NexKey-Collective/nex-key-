const express = require("express");
const router = express.Router();
const firebaseAuth = require("../middleware/firebaseAuth");
const {
  getBuyBox,
  createBuyBox,
  updateBuyBox,
  deleteBuyBox
} = require("../controllers/buyerController");
const {
  getMatchSettings,
  updateMatchSettings,
} = require("../controllers/matchSettingsController");

// All routes require authentication
router.get("/buybox", firebaseAuth, getBuyBox);
router.post("/buybox", firebaseAuth, createBuyBox);
router.put("/buybox", firebaseAuth, updateBuyBox);
router.delete("/buybox", firebaseAuth, deleteBuyBox);

router.get("/match-settings", firebaseAuth, getMatchSettings);
router.put("/match-settings", firebaseAuth, updateMatchSettings);

module.exports = router;
