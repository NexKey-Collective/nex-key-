const { test } = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");
const fs = require("node:fs");
const path = require("node:path");
const { createRequire } = require("node:module");
const express = require("express");
const { createApp } = require("../src/app");
const { validateBuyBoxInput } = require("../src/utils/buyBoxValidation");
const {
  validateMatchSettingsInput,
} = require("../src/utils/matchSettingsValidation");
const { evaluateMatch } = require("../src/services/matchingService");
const { readWithRetry, withDeadline } = require("../src/utils/upstream");
function load(file, mocks) {
  const filename = path.resolve(__dirname, "../src", file);
  const actual = createRequire(filename);
  const context = {
    module: { exports: {} },
    console: { error() {}, log() {} },
    process,
    Buffer,
    require: (name) => (name in mocks ? mocks[name] : actual(name)),
  };
  vm.runInNewContext(fs.readFileSync(filename, "utf8"), context, { filename });
  return context.module.exports;
}
async function server(t, app) {
  const listener = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => listener.once("listening", resolve));
  t.after(() => {
    listener.closeAllConnections();
    listener.close();
  });
  const url = `http://127.0.0.1:${listener.address().port}`;
  return async (route, options = {}) => {
    const response = await fetch(url + route, options);
    return { response, data: await response.json() };
  };
}

test("health/readiness, allowed origins, parser errors, invalid queries, and unknown routes use JSON", async (t) => {
  let healthy = false;
  const router = express
    .Router()
    .get("/", (req, res) => res.json({ deals: [] }))
    .post("/", (req, res) => res.json({ ok: true }));
  const call = await server(
    t,
    createApp({
      routes: { deals: router },
      origins: ["https://app.example"],
      readiness: async () => healthy,
      log() {},
    }),
  );
  assert.equal((await call("/health")).data.status, "ok");
  assert.equal((await call("/ready")).response.status, 503);
  healthy = true;
  assert.equal((await call("/ready")).response.status, 200);
  assert.equal(
    (await call("/api/deals", { headers: { Origin: "https://bad.example" } }))
      .response.status,
    403,
  );
  const allowed = await call("/api/deals", {
    headers: { Origin: "https://app.example" },
  });
  assert.equal(
    allowed.response.headers.get("access-control-allow-origin"),
    "https://app.example",
  );
  for (const query of [
    "minBeds=abc",
    "maxEntryFee=-1",
    "q=a&q=b",
    "monthlyMin=500&monthlyMax=100",
  ]) {
    const result = await call("/api/deals?" + query);
    // Repeated text searches are rejected as scalar parameters.
    assert.equal(result.response.status, 400, query);
  }
  assert.equal(
    (
      await call("/api/deals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{",
      })
    ).response.status,
    400,
  );
  assert.equal(
    (
      await call("/api/deals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "[]",
      })
    ).response.status,
    400,
  );
  assert.equal((await call("/missing")).response.status, 404);
});

test("rate limiter expires windows and does not trust client-supplied forwarding headers", async (t) => {
  const { createRateLimiter } = require("../src/middleware/safeguards");
  let time = 0;
  const app = express();
  app.use(createRateLimiter({ limit: 1, now: () => time }));
  app.get("/", (req, res) => res.json({ ok: true }));
  const call = await server(t, app);
  assert.equal((await call("/")).response.status, 200);
  const denied = await call("/", {
    headers: { "X-Forwarded-For": "other-ip" },
  });
  assert.equal(denied.response.status, 429);
  assert.equal(denied.response.headers.get("retry-after"), "60");
  time = 60001;
  assert.equal((await call("/")).response.status, 200);
});

test("Buy Box inputs reject mass assignment, malformed lists, infinities, and invalid match settings", () => {
  for (const input of [
    null,
    [],
    { userId: "victim" },
    { email: "victim@example.com" },
    { preferredCities: [{}] },
    { entryFeeMax: Infinity },
  ])
    assert.equal(validateBuyBoxInput(input).isValid, false);
  assert.equal(
    validateBuyBoxInput({
      preferredStates: ["TX"],
      entryFeeMax: 0,
      bathroomsMin: 1.5,
    }).isValid,
    true,
  );
  for (const input of [
    null,
    [],
    { weights: { location: 51 } },
    { radiusMiles: Infinity },
    { zipCode: "bad" },
  ])
    assert.equal(validateMatchSettingsInput(input).isValid, false);
});

test("verified signup links GHL and legacy Buy Boxes by Firebase UID; unverified or conflicting owners cannot claim them", async () => {
  for (const [verified, existingOwner, shouldLink] of [
    [true, "", true],
    [true, "airtable-user", true],
    [false, "", false],
    [true, "another-uid", false],
  ]) {
    let linked;
    const setup = load("pipelines/userSetup.js", {
      "../services/userService": {
        findByFirebaseUid: async () => ({
          id: "airtable-user",
          firebaseUid: "firebase-user",
        }),
      },
      "../services/buyBoxService": {
        findByEmail: async () => ({ id: "box", userId: existingOwner }),
        linkUser: async (id, uid) => {
          linked = uid;
        },
      },
      "../services/userBuyBoxService": { findByUserId: async () => null },
    });
    await setup({
      uid: "firebase-user",
      email: "buyer@example.com",
      email_verified: verified,
    });
    assert.equal(linked, shouldLink ? "firebase-user" : undefined);
  }
});

test("buyer journey creates/edits owned preferences and match settings; another account cannot read or edit them", async (t) => {
  const boxes = new Map(),
    settings = new Map();
  const auth = load("middleware/firebaseAuth.js", {
    "../config/firebase": {
      auth: () => ({
        verifyIdToken: async (token) => {
          if (!["buyer", "other"].includes(token)) throw new Error("bad token");
          return {
            uid: token,
            email: token + "@example.com",
            email_verified: true,
          };
        },
      }),
    },
  });
  const buyer = load("controllers/buyerController.js", {
    "../services/userBuyBoxService": {
      findByUserId: async (uid) => boxes.get(uid),
      createForUser: async (uid, value) => {
        const box = { ...value, id: "box", userId: uid };
        boxes.set(uid, box);
        return box;
      },
      updateByUserId: async (uid, value) => {
        if (!boxes.has(uid)) return null;
        boxes.set(uid, { ...boxes.get(uid), ...value });
        return boxes.get(uid);
      },
    },
  });
  const matchSettings = load("controllers/matchSettingsController.js", {
    "../services/matchSettingsService": {
      getSettings: async (uid) => settings.get(uid),
      upsertSettings: async (uid, value) => {
        settings.set(uid, value);
        return value;
      },
    },
  });
  const deals = [
    {
      id: "rec12345678901234",
      dealStatus: "Available",
      state: "TX",
      city: "Dallas",
      entryFee: 30000,
      dealType: "Subto",
      bathCount: 1.5,
      exitStrategies: [],
    },
  ];
  const matches = load("controllers/matchController.js", {
    "../services/userBuyBoxService": {
      findByUserId: async (uid) => boxes.get(uid),
    },
    "../services/matchSettingsService": {
      getSettings: async (uid) => settings.get(uid),
    },
    "../services/dealService": {
      getAllDeals: async () => deals,
      getDealById: async () => deals[0],
    },
    "../services/matchPersistenceService": {
      getLastViewedAt: async () => null,
      syncMatchRecords: async () => ({}),
      markMatchesViewed: async () => {},
    },
  });
  const buyers = express.Router();
  buyers.use(auth);
  buyers
    .get("/buybox", buyer.getBuyBox)
    .post("/buybox", buyer.createBuyBox)
    .put("/buybox", buyer.updateBuyBox);
  buyers.put("/match-settings", matchSettings.updateMatchSettings);
  const matchRouter = express.Router();
  matchRouter.use(auth);
  matchRouter.get("/", matches.getMatchedDeals);
  const call = await server(
    t,
    createApp({ routes: { buyers, matches: matchRouter }, log() {} }),
  );
  const opts = (uid, method = "GET", data) => ({
    method,
    headers: {
      Authorization: `Bearer ${uid}`,
      "Content-Type": "application/json",
    },
    ...(data ? { body: JSON.stringify(data) } : {}),
  });
  assert.equal((await call("/api/buyers/buybox")).response.status, 401);
  assert.equal(
    (await call("/api/matches", opts("buyer"))).data.code,
    "BUY_BOX_REQUIRED",
  );
  assert.equal(
    (
      await call(
        "/api/buyers/buybox",
        opts("buyer", "POST", { preferredStates: ["TX"], entryFeeMax: 40000 }),
      )
    ).response.status,
    201,
  );
  assert.equal(
    (await call("/api/buyers/buybox", opts("other"))).response.status,
    404,
  );
  assert.equal(
    (await call("/api/buyers/buybox", opts("other", "PUT", { entryFeeMax: 1 })))
      .response.status,
    404,
  );
  assert.equal(
    (
      await call(
        "/api/buyers/buybox",
        opts("buyer", "PUT", { entryFeeMax: 50000, bathroomsMin: 1.5 }),
      )
    ).response.status,
    200,
  );
  assert.equal(
    (
      await call(
        "/api/buyers/match-settings",
        opts("buyer", "PUT", { weights: { state: 50, entryFee: 20 } }),
      )
    ).response.status,
    200,
  );
  const result = await call("/api/matches", opts("buyer"));
  assert.equal(result.data.matches[0].matchScore, 100);
  assert.ok(result.data.matches[0].matchReasons.length > 0);
  assert.equal(result.data.scores[0].id, deals[0].id);
});

test("matching handles casing, comma lists, city mismatches, and fractional bathrooms", () => {
  assert.equal(
    evaluateMatch(
      { dealType: "SubTo", state: "TX", bathCount: 1.5 },
      {
        buyingStrategies: "Subto",
        preferredStates: "TX,FL",
        bathroomsMin: 1.5,
      },
    ).score,
    100,
  );
  assert.equal(
    evaluateMatch({ city: "Austin" }, { preferredCities: "Dallas" }).score,
    0,
  );
  assert.equal(evaluateMatch({}, {}).score, 0);
});

test("webhook authentication fails closed when not configured and rejects wrong secrets", () => {
  const previous = process.env.GHL_WEBHOOK_SECRET;
  const verify = require("../src/middleware/ghlWebhookAuth");
  try {
    for (const [secret, supplied, expected] of [
      ["", "", 503],
      ["expected", "bad", 401],
      ["expected", "expected", 200],
    ]) {
      process.env.GHL_WEBHOOK_SECRET = secret;
      let status = 200,
        next = false;
      const res = {
        status(value) {
          status = value;
          return this;
        },
        json() {},
      };
      verify({ headers: { "x-webhook-secret": supplied } }, res, () => {
        next = true;
      });
      assert.equal(status, expected);
      assert.equal(next, expected === 200);
    }
  } finally {
    if (previous === undefined) delete process.env.GHL_WEBHOOK_SECRET;
    else process.env.GHL_WEBHOOK_SECRET = previous;
  }
});

test("read retries are bounded and 429 is not immediately retried; deadlines return promptly", async () => {
  let calls = 0;
  const result = await readWithRetry(
    async () => {
      if (++calls === 1) throw { statusCode: 503 };
      return "ok";
    },
    { wait: async () => {} },
  );
  assert.equal(result, "ok");
  assert.equal(calls, 2);
  calls = 0;
  await assert.rejects(
    readWithRetry(
      async () => {
        calls++;
        throw { statusCode: 429 };
      },
      { wait: async () => {} },
    ),
  );
  assert.equal(calls, 1);
  await assert.rejects(
    withDeadline(() => new Promise(() => {}), 5),
    /timed out/,
  );
});

test("saved deals persist by verified token identity and cannot leak across accounts", async (t) => {
  const stored = new Map();
  const db = {
    collection: () => ({
      doc: (uid) => ({
        collection: () => ({
          get: async () => ({
            docs: [...(stored.get(uid) || new Set())].map((id) => ({ id })),
          }),
          doc: (id) => ({
            set: async () => {
              const ids = stored.get(uid) || new Set();
              ids.add(id);
              stored.set(uid, ids);
            },
            delete: async () => {
              stored.get(uid)?.delete(id);
            },
          }),
        }),
      }),
    }),
  };
  const auth = load("middleware/firebaseAuth.js", {
    "../config/firebase": {
      auth: () => ({ verifyIdToken: async (uid) => ({ uid }) }),
    },
  });
  const favorites = load("routes/favoriteRoutes.js", {
    "../middleware/firebaseAuth": auth,
    "../config/firestore": db,
  });
  const call = await server(t, createApp({ routes: { favorites }, log() {} }));
  const opts = (uid, saved) => ({
    method: saved === undefined ? "GET" : "PUT",
    headers: {
      Authorization: `Bearer ${uid}`,
      "Content-Type": "application/json",
    },
    ...(saved === undefined ? {} : { body: JSON.stringify({ saved }) }),
  });
  assert.equal((await call("/api/favorites")).response.status, 401);
  const id = "rec12345678901234";
  assert.equal(
    (await call(`/api/favorites/${id}`, opts("buyer", true))).response.status,
    200,
  );
  assert.deepEqual((await call("/api/favorites", opts("buyer"))).data.ids, [
    id,
  ]);
  assert.deepEqual((await call("/api/favorites", opts("other"))).data.ids, []);
  await call(`/api/favorites/${id}`, opts("buyer", false));
  assert.deepEqual((await call("/api/favorites", opts("buyer"))).data.ids, []);
  assert.equal(
    (await call("/api/favorites/invalid", opts("buyer", true))).response.status,
    400,
  );
});

test("deal detail distinguishes removed listings from an upstream outage", async () => {
  for (const [result, error, expected] of [
    [{ dealStatus: "Sold" }, null, 404],
    [null, { statusCode: 404 }, 404],
    [null, { statusCode: 503, message: "upstream" }, 503],
  ]) {
    const controller = load("controllers/dealController.js", {
      "../services/dealService": {
        getDealById: async () => {
          if (error) throw error;
          return result;
        },
      },
    });
    let status = 200;
    await controller.getDealById(
      { params: { id: "record" } },
      {
        status(code) {
          status = code;
          return this;
        },
        json() {},
      },
    );
    assert.equal(status, expected);
  }
});

test("unverified tokens cannot access buyer management or matching", () => {
  const requireVerified = load("middleware/firebaseAuth.js", {
    "../config/firebase": {},
  }).requireVerifiedEmail;
  let status,
    allowed = false;
  const res = {
    status(value) {
      status = value;
      return this;
    },
    json() {},
  };
  requireVerified(
    { user: { uid: "buyer", email_verified: false } },
    res,
    () => {
      allowed = true;
    },
  );
  assert.equal(status, 403);
  assert.equal(allowed, false);
  requireVerified({ user: { uid: "buyer", email_verified: true } }, res, () => {
    allowed = true;
  });
  assert.equal(allowed, true);
});

test("GHL exit strategies do not incorrectly count as a missing deal type", () => {
  assert.equal(
    evaluateMatch(
      { state: "TX", dealType: "Subto", exitStrategies: ["Buy and Hold"] },
      { preferredStates: "TX", buyingStrategies: "Buy and Hold" },
    ).score,
    100,
  );
});
