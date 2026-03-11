const userSetup = require("../pipelines/userSetup");

const syncUser = async (req, res) => {
  try {
    const user = await userSetup(req.user);
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Sync error:", error);
    return res.status(500).json({ error: "Failed to sync user" });
  }
};

module.exports = { syncUser };