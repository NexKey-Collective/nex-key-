const admin = require("../config/firebase");
const db = require("../config/firestore");

const RECORDS_COLLECTION = "matchRecords";
const STATE_COLLECTION = "userMatchState";
const BATCH_LIMIT = 500; // Firestore's max operations per batch

async function getLastViewedAt(userId) {
  const doc = await db.collection(STATE_COLLECTION).doc(userId).get();
  if (!doc.exists) return null;
  return doc.data().lastViewedMatchesAt || null;
}

async function markMatchesViewed(userId) {
  await db
    .collection(STATE_COLLECTION)
    .doc(userId)
    .set({ lastViewedMatchesAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
}

// Persists the latest score/match state per deal and reports which matched deals
// are newly matched since `lastViewedAt` (a Firestore Timestamp or null).
async function syncMatchRecords(userId, scoredDeals, lastViewedAt) {
  const refs = scoredDeals.map((deal) =>
    db.collection(RECORDS_COLLECTION).doc(`${userId}_${deal.id}`)
  );

  const existingDocs = refs.length > 0 ? await db.getAll(...refs) : [];
  const now = admin.firestore.FieldValue.serverTimestamp();
  const isNewMatchByDealId = {};
  const pendingWrites = [];

  scoredDeals.forEach((deal, i) => {
    const existing = existingDocs[i];
    const existingData = existing.exists ? existing.data() : null;
    const wasMatched = existingData?.isMatched || false;
    const firstMatchedAt =
      existingData?.firstMatchedAt || (deal.isMatched ? now : null);

    // Skip the write when score/match state haven't changed, so a page load
    // doesn't cost a Firestore write per deal every single time.
    const unchanged =
      existingData &&
      existingData.score === deal.matchScore &&
      existingData.isMatched === deal.isMatched;

    if (!unchanged) {
      pendingWrites.push([
        refs[i],
        {
          userId,
          dealId: deal.id,
          score: deal.matchScore,
          isMatched: deal.isMatched,
          firstMatchedAt,
          lastComputedAt: now,
        },
      ]);
    }

    // A deal just became matched this run (wasn't matched before) counts as new.
    // Otherwise fall back to comparing the persisted firstMatchedAt against lastViewedAt.
    if (deal.isMatched && !wasMatched) {
      isNewMatchByDealId[deal.id] = true;
    } else if (deal.isMatched && lastViewedAt && existingData?.firstMatchedAt) {
      isNewMatchByDealId[deal.id] =
        existingData.firstMatchedAt.toMillis() > lastViewedAt.toMillis();
    } else {
      isNewMatchByDealId[deal.id] = false;
    }
  });

  // Firestore batches cap at 500 operations, so chunk when there are more deals than that.
  for (let i = 0; i < pendingWrites.length; i += BATCH_LIMIT) {
    const batch = db.batch();
    pendingWrites.slice(i, i + BATCH_LIMIT).forEach(([ref, data]) => {
      batch.set(ref, data, { merge: true });
    });
    await batch.commit();
  }

  return isNewMatchByDealId;
}

module.exports = { getLastViewedAt, markMatchesViewed, syncMatchRecords };
