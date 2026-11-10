const router = require("express").Router();
const firebaseAuth = require("../middleware/firebaseAuth");
const db = require("../config/firestore");
router.use(firebaseAuth);
router.get("/", async (req, res) => {
  try {
    const snapshot = await db
      .collection("buyerFavorites")
      .doc(req.user.uid)
      .collection("deals")
      .get();
    res.json({ ids: snapshot.docs.map((doc) => doc.id) });
  } catch {
    res.status(503).json({ error: "Saved deals are temporarily unavailable" });
  }
});
router.put("/:dealId", async (req, res) => {
  if (
    !/^rec[a-zA-Z0-9]{14}$/.test(req.params.dealId) ||
    typeof req.body.saved !== "boolean" ||
    Object.keys(req.body).some((key) => key !== "saved")
  )
    return res.status(400).json({ error: "Invalid saved deal" });
  try {
    const ref = db
      .collection("buyerFavorites")
      .doc(req.user.uid)
      .collection("deals")
      .doc(req.params.dealId);
    if (req.body.saved) await ref.set({ savedAt: new Date().toISOString() });
    else await ref.delete();
    res.json({ success: true });
  } catch {
    res.status(503).json({ error: "Unable to update saved deal" });
  }
});
module.exports = router;
