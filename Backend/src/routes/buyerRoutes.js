const express = require("express");
const router = express.Router();
const firebaseAuth = require("../middleware/firebaseAuth");
router.use(firebaseAuth, firebaseAuth.requireVerifiedEmail);
const {
  getBuyBox,
  createBuyBox,
  updateBuyBox,
  deleteBuyBox,
} = require("../controllers/buyerController");
const {
  getMatchSettings,
  updateMatchSettings,
} = require("../controllers/matchSettingsController");

// All routes require authentication
router.get("/buybox", getBuyBox);
router.post("/buybox", createBuyBox);
router.put("/buybox", updateBuyBox);
router.delete("/buybox", deleteBuyBox);

router.get("/match-settings", getMatchSettings);
router.put("/match-settings", updateMatchSettings);

module.exports = router;
