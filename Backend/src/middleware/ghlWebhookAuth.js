const crypto = require("crypto");

// GHL's generic "Custom Webhook" action doesn't sign payloads on its own —
// the only way to secure this endpoint is a shared secret GHL is configured
// to send back as a header. GHL isn't configured to send one yet, so this
// stays a no-op (endpoint open, same as today) until GHL_WEBHOOK_SECRET is
// set in the environment. Once it's set, requests must include a matching
// x-webhook-secret header or get rejected. Configure the same value in the
// GHL workflow's webhook action (as a custom header) when you set this.
function verifyGhlWebhookSecret(req, res, next) {
  const expected = process.env.GHL_WEBHOOK_SECRET;
  if (!expected) return next();

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
