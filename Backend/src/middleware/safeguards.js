// Per-process fixed windows; use a gateway/shared limiter before scaling replicas.
function createRateLimiter({
  limit = 120,
  windowMs = 60000,
  now = Date.now,
} = {}) {
  const windows = new Map();
  return (req, res, next) => {
    const time = now();
    for (const [key, value] of windows)
      if (value.reset <= time) windows.delete(key);
    const key = req.ip;
    const entry = windows.get(key) || { count: 0, reset: time + windowMs };
    entry.count++;
    windows.set(key, entry);
    res.setHeader("RateLimit-Limit", limit);
    res.setHeader("RateLimit-Remaining", Math.max(0, limit - entry.count));
    if (entry.count > limit) {
      res.setHeader("Retry-After", Math.ceil((entry.reset - time) / 1000));
      return res
        .status(429)
        .json({ error: "Too many requests. Please try again shortly." });
    }
    next();
  };
}
function validateRequest(req, res, next) {
  if (
    ["POST", "PUT", "PATCH"].includes(req.method) &&
    (!req.body || typeof req.body !== "object" || Array.isArray(req.body))
  ) {
    return res.status(400).json({ error: "Body must be a JSON object" });
  }
  if (req.path.startsWith("/api/deals")) {
    const numeric = [
      "minBeds",
      "minBaths",
      "minEntryFee",
      "maxEntryFee",
      "monthlyMin",
      "monthlyMax",
    ];
    for (const [key, value] of Object.entries(req.query)) {
      if (Array.isArray(value) && key !== "exitStrategies[]")
        return res.status(400).json({ error: "Expected a single query value" });
      const values = Array.isArray(value) ? value : [value];
      if (
        values.length > 30 ||
        values.some((v) => typeof v !== "string" || v.length > 200)
      )
        return res.status(400).json({ error: "Invalid query parameter" });
      if (
        numeric.includes(key) &&
        (Array.isArray(value) ||
          !value.trim() ||
          !Number.isFinite(Number(value)) ||
          Number(value) < 0)
      )
        return res
          .status(400)
          .json({ error: `${key} must be a non-negative number` });
    }
    for (const [min, max] of [
      ["minEntryFee", "maxEntryFee"],
      ["monthlyMin", "monthlyMax"],
    ]) {
      if (
        req.query[min] !== undefined &&
        req.query[max] !== undefined &&
        Number(req.query[min]) > Number(req.query[max])
      )
        return res.status(400).json({ error: `${min} must not exceed ${max}` });
    }
  }
  next();
}
module.exports = { createRateLimiter, validateRequest };
