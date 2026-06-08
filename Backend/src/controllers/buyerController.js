const userBuyBoxService = require("../services/userBuyBoxService");
const { validateBuyBoxInput } = require("../utils/buyBoxValidation");

const getBuyBox = async (req, res) => {
  try {
    const userId = req.user.uid;
    const buyBox = await userBuyBoxService.findByUserId(userId);

    if (!buyBox) {
      return res.status(404).json({ 
        buyBox: null, 
        message: "No Buy Box set up yet" 
      });
    }

    return res.status(200).json({ buyBox });
  } catch (error) {
    console.error("Get Buy Box error:", error);
    return res.status(500).json({ error: "Failed to fetch Buy Box" });
  }
};

const createBuyBox = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { isValid, errors } = validateBuyBoxInput(req.body);

    if (!isValid) {
      return res.status(400).json({ 
        error: "Validation failed", 
        details: errors 
      });
    }

    // Check if user already has a Buy Box
    const existing = await userBuyBoxService.findByUserId(userId);
    if (existing) {
      return res.status(400).json({ 
        error: "Buy Box already exists. Use PUT to update." 
      });
    }

    const buyBox = await userBuyBoxService.createForUser(userId, req.body);

    return res.status(201).json({ success: true, buyBox });
  } catch (error) {
    console.error("Create Buy Box error:", error);
    return res.status(500).json({ error: "Failed to create Buy Box" });
  }
};

const updateBuyBox = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { isValid, errors } = validateBuyBoxInput(req.body);

    if (!isValid) {
      return res.status(400).json({ 
        error: "Validation failed", 
        details: errors 
      });
    }

    const buyBox = await userBuyBoxService.updateByUserId(userId, req.body);

    if (!buyBox) {
      return res.status(404).json({ 
        error: "Buy Box not found. Create one first using POST." 
      });
    }

    return res.status(200).json({ success: true, buyBox });
  } catch (error) {
    console.error("Update Buy Box error:", error);
    return res.status(500).json({ error: "Failed to update Buy Box" });
  }
};

const deleteBuyBox = async (req, res) => {
  try {
    const userId = req.user.uid;
    const deleted = await userBuyBoxService.deleteByUserId(userId);

    if (!deleted) {
      return res.status(404).json({ error: "Buy Box not found" });
    }

    return res.status(200).json({ 
      success: true, 
      message: "Buy Box deleted" 
    });
  } catch (error) {
    console.error("Delete Buy Box error:", error);
    return res.status(500).json({ error: "Failed to delete Buy Box" });
  }
};

module.exports = { getBuyBox, createBuyBox, updateBuyBox, deleteBuyBox };
