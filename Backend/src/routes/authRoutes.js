const express = require("express");
const router = express.Router();
const firebaseAuth = require("../middleware/firebaseAuth");
const { syncUser } = require("../controllers/authController");

// POST /api/auth/sync
router.post("/sync", firebaseAuth, syncUser);

module.exports = router;