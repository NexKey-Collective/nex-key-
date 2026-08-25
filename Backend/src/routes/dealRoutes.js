const express = require("express");
const router = express.Router();
const { getDeals, getDealById } = require("../controllers/dealController");

// GET /api/deals
router.get("/", getDeals);

// GET /api/deals/:id
router.get("/:id", getDealById);

module.exports = router;