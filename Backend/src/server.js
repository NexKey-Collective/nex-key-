require("dotenv").config();
const required = ["AIRTABLE_TOKEN", "BASE_ID", "FIREBASE_SERVICE_ACCOUNT"];
if (process.env.NODE_ENV === "production")
  required.push("ALLOWED_ORIGINS", "GHL_WEBHOOK_SECRET");
for (const key of required)
  if (!process.env[key])
    throw new Error(`Missing required environment variable: ${key}`);
const trustProxyHops = Number(process.env.TRUST_PROXY_HOPS || 0);
if (
  !Number.isInteger(trustProxyHops) ||
  trustProxyHops < 0 ||
  trustProxyHops > 5
)
  throw new Error("TRUST_PROXY_HOPS must be an integer from 0 to 5");
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:5173")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);
for (const origin of allowedOrigins) {
  const parsed = new URL(origin);
  if (
    !["http:", "https:"].includes(parsed.protocol) ||
    parsed.origin !== origin
  )
    throw new Error("ALLOWED_ORIGINS must contain exact HTTP origins");
}
const { createApp } = require("./app");
const dealService = require("./services/dealService");
const db = require("./config/firestore");
let readyUntil = 0;
const app = createApp({
  origins: allowedOrigins,
  trustProxy: trustProxyHops || false,
  routes: {
    auth: require("./routes/authRoutes"),
    deals: require("./routes/dealRoutes"),
    webhooks: require("./routes/webhookRoutes"),
    buyers: require("./routes/buyerRoutes"),
    matches: require("./routes/matchRoutes"),
    favorites: require("./routes/favoriteRoutes"),
  },
  readiness: async () => {
    if (Date.now() < readyUntil) return true;
    await Promise.all([
      dealService.getAllDeals(),
      db.collection("userMatchState").limit(1).get(),
    ]);
    readyUntil = Date.now() + 30000;
    return true;
  },
});
const server = app.listen(process.env.PORT || 3000, () =>
  console.log(JSON.stringify({ event: "started" })),
);
server.requestTimeout = 30000;
server.headersTimeout = 15000;
for (const signal of ["SIGTERM", "SIGINT"])
  process.on(signal, () => {
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(1), 10000).unref();
  });
