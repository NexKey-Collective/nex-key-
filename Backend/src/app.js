const express = require("express");
const cors = require("cors");
const { randomUUID } = require("node:crypto");
const {
  createRateLimiter,
  validateRequest,
} = require("./middleware/safeguards");

function createApp({
  routes = {},
  readiness = async () => true,
  origins = [],
  trustProxy = false,
  log = console.log,
} = {}) {
  const app = express();
  app.disable("x-powered-by");
  app.set("trust proxy", trustProxy);
  app.use((req, res, next) => {
    req.requestId = randomUUID();
    res.setHeader("X-Request-ID", req.requestId);
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Cache-Control", "no-store");
    const started = Date.now();
    res.on("finish", () =>
      log(
        JSON.stringify({
          event: "request",
          requestId: req.requestId,
          method: req.method,
          path: req.path,
          status: res.statusCode,
          durationMs: Date.now() - started,
        }),
      ),
    );
    next();
  });
  app.use(
    cors({
      exposedHeaders: ["X-Request-ID", "Retry-After"],
      origin(origin, callback) {
        if (!origin || origins.includes(origin)) return callback(null, true);
        const error = new Error("Origin is not allowed");
        error.status = 403;
        callback(error);
      },
    }),
  );
  app.get("/health", (req, res) => res.json({ status: "ok" }));
  app.get("/ready", async (req, res) => {
    try {
      if (!(await readiness())) throw new Error("Not ready");
      res.json({ status: "ready" });
    } catch {
      res
        .status(503)
        .json({ error: "Service is not ready", requestId: req.requestId });
    }
  });
  app.use("/api", createRateLimiter());
  app.use(express.json({ limit: "64kb", strict: true }));
  app.use(validateRequest);
  for (const [path, router] of Object.entries(routes))
    app.use(`/api/${path}`, router);
  app.use((req, res) =>
    res
      .status(404)
      .json({ error: "Endpoint not found", requestId: req.requestId }),
  );
  app.use((error, req, res, next) => {
    if (res.headersSent) return next(error);
    const status =
      error.status >= 400 && error.status < 600 ? error.status : 500;
    res
      .status(status)
      .json({
        error:
          status === 500
            ? "Internal server error"
            : status === 413
              ? "Request is too large"
              : status === 400
                ? "Invalid request"
                : error.message,
        requestId: req.requestId,
      });
  });
  return app;
}
module.exports = { createApp };
