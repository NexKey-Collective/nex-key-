// Refresh on demand after four minutes, while never serving a snapshot older
// than five minutes. One refresh is shared by all concurrent callers.
function createDealsCache(load, {
  now = Date.now,
  refreshAfterMs = 4 * 60 * 1000,
  maxAgeMs = 5 * 60 * 1000,
  retryDelayMs = 30 * 1000,
  onError = (error) => console.error("Failed to refresh deals cache:", error),
} = {}) {
  let snapshot = null;
  let fetchedAt = 0;
  let inflight = null;
  let retryAt = 0;
  let lastError;

  function refresh() {
    if (!inflight) {
      inflight = Promise.resolve().then(load).then((deals) => {
        snapshot = deals;
        fetchedAt = now();
        retryAt = 0;
        lastError = null;
        return deals;
      }).catch((error) => {
        lastError = error;
        retryAt = now() + retryDelayMs;
        throw error;
      }).finally(() => { inflight = null; });
    }
    return inflight;
  }

  return async function getDeals() {
    const age = now() - fetchedAt;
    if (snapshot !== null && age < maxAgeMs) {
      if (age >= refreshAfterMs && !inflight && now() >= retryAt) {
        void refresh().catch(onError);
      }
      return snapshot;
    }
    // Cold/expired requests wait for fresh data; an upstream outage must not
    // cause sold listings to remain visible indefinitely.
    if (inflight) return inflight;
    if (now() < retryAt) throw lastError;
    return refresh();
  };
}

module.exports = { createDealsCache };
