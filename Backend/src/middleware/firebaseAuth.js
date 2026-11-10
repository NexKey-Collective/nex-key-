const { withDeadline } = require("../utils/upstream");
const admin = require("../config/firebase");

const firebaseAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    const decoded = await withDeadline(
      () => admin.auth().verifyIdToken(token, true),
      10000,
    );
    req.user = decoded;
    next();
  } catch (error) {
    if (error.status === 503)
      return res
        .status(503)
        .json({ error: "Authentication is temporarily unavailable" });
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = firebaseAuth;
module.exports.requireVerifiedEmail = (req, res, next) => {
  if (!req.user.email_verified)
    return res
      .status(403)
      .json({
        error: "Verify your email to manage your Buy Box and matches",
        code: "EMAIL_VERIFICATION_REQUIRED",
      });
  next();
};
