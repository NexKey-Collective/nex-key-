const express = require("express");
const router = express.Router();
const { handleGhlWebhook } = require("../controllers/webhookController");
const verifyGhlWebhookSecret = require("../middleware/ghlWebhookAuth");

// POST /api/webhooks/ghl - GHL calls this directly. Only enforces a shared
// secret once GHL_WEBHOOK_SECRET is set in the environment (see middleware) —
// open today, same as before, until that's configured.
router.post("/ghl", verifyGhlWebhookSecret, handleGhlWebhook);

module.exports = router;