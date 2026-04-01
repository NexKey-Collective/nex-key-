const express = require("express");
const router = express.Router();
const firebaseAuth = require("../middleware/firebaseAuth");
const { getDeals, getDealById } = require("../controllers/dealController");

// GET /api/deals
router.get("/", firebaseAuth, getDeals);

// GET /api/deals/:id
router.get("/:id", firebaseAuth, getDealById);

module.exports = router;