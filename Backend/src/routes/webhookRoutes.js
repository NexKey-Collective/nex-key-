const express = require("express");
const router = express.Router();
const { handleGhlWebhook } = require("../controllers/webhookController");
const verifyGhlWebhookSecret = require("../middleware/ghlWebhookAuth");

router.post("/ghl", verifyGhlWebhookSecret, handleGhlWebhook);

module.exports = router;
