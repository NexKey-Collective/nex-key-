const express = require("express");
const router = express.Router();
const firebaseAuth = require("../middleware/firebaseAuth");
router.use(firebaseAuth, firebaseAuth.requireVerifiedEmail);
const {
  getMatchedDeals,
  getMatchScore,
} = require("../controllers/matchController");

// GET /api/matches - Get all matched deals with scores
router.get("/", getMatchedDeals);

// GET /api/matches/:dealId - Get match score for specific deal
router.get("/:dealId", getMatchScore);

module.exports = router;
