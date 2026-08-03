const matchSettingsService = require("../services/matchSettingsService");
const { validateMatchSettingsInput } = require("../utils/matchSettingsValidation");

const getMatchSettings = async (req, res) => {
  try {
    const userId = req.user.uid;
    const settings = await matchSettingsService.getSettings(userId);

    if (!settings) {
      return res.status(200).json({ settings: null, message: "Using default match settings" });
    }

    return res.status(200).json({ settings });
  } catch (error) {
    console.error("Get match settings error:", error);
    return res.status(500).json({ error: "Failed to fetch match settings" });
  }
};

const updateMatchSettings = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { isValid, errors } = validateMatchSettingsInput(req.body);

    if (!isValid) {
      return res.status(400).json({ error: "Validation failed", details: errors });
    }

    const settings = await matchSettingsService.upsertSettings(userId, req.body);

    return res.status(200).json({ success: true, settings });
  } catch (error) {
    console.error("Update match settings error:", error);
    return res.status(500).json({ error: "Failed to update match settings" });
  }
};

module.exports = { getMatchSettings, updateMatchSettings };
