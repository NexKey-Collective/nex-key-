const { mapGhlPayload } = require("../models/BuyBox");
const buyBoxService = require("../services/buyBoxService");

const handleGhlWebhook = async (req, res) => {
  try {
    const payload = req.body;

    // Validate that we have an email or contact_id
    if (!payload.email && !payload.contact_id) {
      return res.status(400).json({ error: "Missing email or contact_id" });
    }

    // Map GHL payload to Airtable fields
    console.log("Full payload:", JSON.stringify(payload, null, 2));
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

    console.log(`BuyBox ${existing ? "updated" : "created"} for ${payload.email}`);
    return res.status(200).json({ success: true, id: buyBox.id });
  } catch (error) {
    console.error("GHL webhook error:", error);
    return res.status(500).json({ error: "Failed to process webhook" });
  }
};

module.exports = { handleGhlWebhook };