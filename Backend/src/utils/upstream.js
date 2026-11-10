const { setTimeout: delay } = require("node:timers/promises");
function withDeadline(operation, ms = 12000) {
  let timer;
  return Promise.race([
    Promise.resolve().then(operation),
    new Promise((_, reject) => {
      timer = setTimeout(() => {
        const error = new Error("Upstream request timed out");
        error.status = 503;
        reject(error);
      }, ms);
    }),
  ]).finally(() => clearTimeout(timer));
}
// Retry reads only. Replaying an uncertain write can create duplicate records.
async function readWithRetry(operation, { attempts = 2, wait = delay } = {}) {
  for (let attempt = 0; ; attempt++) {
    try {
      return await withDeadline(operation);
    } catch (error) {
      if (
        error.message === "Upstream request timed out" ||
        attempt + 1 >= attempts ||
        ![500, 502, 503, 504].includes(error.statusCode || error.status)
      )
        throw error;
      await wait(250 * 2 ** attempt);
    }
  }
}
module.exports = { withDeadline, readWithRetry };
