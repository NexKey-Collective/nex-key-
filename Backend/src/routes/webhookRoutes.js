const express = require("express");
const router = express.Router();
const { handleGhlWebhook } = require("../controllers/webhookController");

// POST /api/webhooks/ghl - no auth, GHL calls this directly
router.post("/ghl", handleGhlWebhook);

module.exports = router;