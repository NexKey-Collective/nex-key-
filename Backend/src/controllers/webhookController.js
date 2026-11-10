const { mapGhlPayload } = require("../models/BuyBox");
const buyBoxService = require("../services/buyBoxService");

const handleGhlWebhook = async (req, res) => {
  try {
    const payload = req.body;

    // Validate that we have an email or contact_id
    if (!payload.email && !payload.contact_id) {
      return res.status(400).json({ error: "Missing email or contact_id" });
    }

    const identityFields = [payload.email, payload.contact_id].filter(
      (value) => value !== undefined,
    );
    if (
      identityFields.some(
        (value) => typeof value !== "string" || value.length > 254,
      ) ||
      (payload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email))
    ) {
      return res.status(400).json({ error: "Invalid webhook identity" });
    }
    const mappedKeys = [
      "first_name",
      "last_name",
      "Preferred States",
      "Preferred Cities",
      "Buying Strategies",
      "Interested Deal Type",
      "Buy Box Status",
      "Buyer Status",
      "contact_source",
      "Buy Box Submitted At ",
    ];
    for (const key of mappedKeys) {
      const value = payload[key];
      if (value === undefined) continue;
      if (!(
        (typeof value === "string" && value.length <= 2000) ||
        (typeof value === "number" && Number.isFinite(value)) ||
        value === null ||
        (Array.isArray(value) &&
          value.length <= 50 &&
          value.every((item) => typeof item === "string" && item.length <= 200))
      )) {
        return res.status(400).json({ error: "Invalid webhook field" });
      }
    }
    for (const key of [
      "Purchase Price (Max)",
      "Entry Fee (Max)",
      "Bedrooms (Min)",
      "Bathrooms (Min)",
    ]) {
      const value = payload[key];
      if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        (!["string", "number"].includes(typeof value) ||
          !Number.isFinite(Number(value)) ||
          Number(value) < 0)
      ) {
        return res.status(400).json({ error: `Invalid ${key}` });
      }
    }
    // Ignore unrelated GHL metadata; only mapped fields are persisted.
    const fields = mapGhlPayload(payload);

    // Check if this contact already has a buy box submission
    let existing = null;

    if (payload.contact_id) {
      existing = await buyBoxService.findByGhlContactId(payload.contact_id);
    }

    if (!existing && payload.email) {
      existing = await buyBoxService.findByEmail(payload.email);
    }

    let buyBox;

    if (existing) {
      // Update existing record
      buyBox = await buyBoxService.updateBuyBox(existing.id, fields);
    } else {
      // Create new record
      buyBox = await buyBoxService.createBuyBox(fields);
    }

    return res.status(200).json({ success: true, id: buyBox.id });
  } catch (error) {
    console.error("GHL webhook error:", error);
    return res.status(500).json({ error: "Failed to process webhook" });
  }
};

module.exports = { handleGhlWebhook };
