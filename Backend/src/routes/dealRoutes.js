const express = require("express");
const router = express.Router();
const { getDeals, getDealById } = require("../controllers/dealController");

// GET /api/deals
router.get("/", getDeals);

// Coordinates are looked up in the background and cached between restarts.
router.get("/map-locations", async (req, res) => {
  try {
    const { getMapLocations } = require("../services/mapService");
    res.json(await getMapLocations());
  } catch (error) {
    console.error("Map locations error:", error.message);
    res.status(503).json({ error: "Map locations are temporarily unavailable" });
  }
});

// GET /api/deals/:id
router.get("/:id", getDealById);

module.exports = router;