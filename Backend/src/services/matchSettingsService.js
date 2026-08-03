const db = require("../config/firestore");

const COLLECTION = "buyerMatchSettings";

async function getSettings(userId) {
  const doc = await db.collection(COLLECTION).doc(userId).get();
  return doc.exists ? doc.data() : null;
}

async function upsertSettings(userId, { weights, zipCode, radiusMiles }) {
  const ref = db.collection(COLLECTION).doc(userId);
  const update = { updatedAt: new Date().toISOString() };

  if (weights !== undefined) update.weights = weights;
  if (zipCode !== undefined) update.zipCode = zipCode;
  if (radiusMiles !== undefined) update.radiusMiles = radiusMiles;

  await ref.set(update, { merge: true });
  const doc = await ref.get();
  return doc.data();
}

module.exports = { getSettings, upsertSettings };
