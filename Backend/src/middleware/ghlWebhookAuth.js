const crypto = require("crypto");

function verifyGhlWebhookSecret(req, res, next) {
  const expected = process.env.GHL_WEBHOOK_SECRET;
  if (!expected)
    return res.status(503).json({ error: "Webhook is not configured" });

  const provided = req.headers["x-webhook-secret"] || "";
  const expectedBuf = Buffer.from(expected);
  const providedBuf = Buffer.from(provided);

  const isValid =
    expectedBuf.length === providedBuf.length &&
    crypto.timingSafeEqual(expectedBuf, providedBuf);

  if (!isValid) {
    return res.status(401).json({ error: "Invalid webhook secret" });
  }

  next();
}

module.exports = verifyGhlWebhookSecret;
