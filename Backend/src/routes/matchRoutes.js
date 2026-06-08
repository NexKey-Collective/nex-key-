const express = require("express");
const router = express.Router();
const firebaseAuth = require("../middleware/firebaseAuth");
const { getMatchedDeals, getMatchScore } = require("../controllers/matchController");

// GET /api/matches - Get all matched deals with scores
router.get("/", firebaseAuth, getMatchedDeals);

// GET /api/matches/:dealId - Get match score for specific deal
router.get("/:dealId", firebaseAuth, getMatchScore);

module.exports = router;
