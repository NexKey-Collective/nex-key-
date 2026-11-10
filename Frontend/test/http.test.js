import { test } from "node:test";
import assert from "node:assert/strict";
import { request, jsonResponse } from "../src/utils/http.js";
test("reads retry transient failures once and writes are never replayed", async () => {
  let calls = 0;
  const fetcher = async () => {
    calls++;
    return new Response("{}", { status: calls === 1 ? 503 : 200 });
  };
  assert.equal(
    (await request("/api", {}, { fetcher, wait: async () => {} })).status,
    200,
  );
  assert.equal(calls, 2);
  calls = 0;
  assert.equal(
    (await request("/api", { method: "POST" }, { fetcher })).status,
    503,
  );
  assert.equal(calls, 1);
});
test("typed errors preserve unavailable vs not-found and Buy Box setup states", async () => {
  for (const [status, code] of [
    [404, undefined],
    [503, undefined],
    [400, "BUY_BOX_REQUIRED"],
  ]) {
    await assert.rejects(
      jsonResponse(
        new Response(JSON.stringify({ error: "message", code }), { status }),
      ),
      (error) => error.status === status && error.code === code,
    );
  }
});
