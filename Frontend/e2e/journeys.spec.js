import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const id = "rec12345678901234";
const deal = {
  id,
  address: "123 Main Street",
  city: "Dallas",
  state: "TX",
  zipCode: "75201",
  dealType: "Subto",
  entryFee: 30000,
  totalMonthlyPayment: 1400,
  bedCount: 3,
  bathCount: 1.5,
  dealStatus: "Available",
  exitStrategies: [],
  listingImageUrl: "",
};
async function fixtures(page, overrides = {}) {
  const state = {
    verified: false,
    box: null,
    settings: null,
    favorites: [],
    syncFailures: 0,
    detailStatus: 200,
    outbox: [],
    score: 92,
    ...overrides,
  };
  const jwt = () =>
    [
      Buffer.from(JSON.stringify({ alg: "none" })).toString("base64url"),
      Buffer.from(
        JSON.stringify({
          sub: "test-buyer",
          user_id: "test-buyer",
          email: "buyer@example.com",
          email_verified: state.verified,
          aud: "nexkey-core",
          iss: "https://securetoken.google.com/nexkey-core",
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 3600,
          auth_time: Math.floor(Date.now() / 1000),
          firebase: { sign_in_provider: "password" },
        }),
      ).toString("base64url"),
      "signature",
    ].join(".");
  await page.route("**/*", async (route) => {
    const req = route.request(),
      url = new URL(req.url());
    const json = (data, status = 200) =>
      route.fulfill({
        status,
        contentType: "application/json",
        body: JSON.stringify(data),
        headers: { "access-control-allow-origin": "*" },
      });
    if (req.method() === "OPTIONS")
      return route.fulfill({
        status: 204,
        headers: {
          "access-control-allow-origin": "*",
          "access-control-allow-headers": "*",
          "access-control-allow-methods": "*",
        },
      });
    if (url.hostname === "identitytoolkit.googleapis.com") {
      const body = req.postDataJSON() || {};
      if (url.pathname.endsWith("accounts:sendOobCode")) {
        state.outbox.push(body.requestType);
        return json({ email: "buyer@example.com" });
      }
      if (url.pathname.endsWith("accounts:lookup"))
        return json({
          users: [
            {
              localId: "test-buyer",
              email: "buyer@example.com",
              emailVerified: state.verified,
              passwordHash: "hash",
              providerUserInfo: [
                {
                  providerId: "password",
                  email: "buyer@example.com",
                  federatedId: "buyer@example.com",
                },
              ],
            },
          ],
        });
      return json({
        idToken: jwt(),
        refreshToken: "refresh",
        expiresIn: "3600",
        localId: "test-buyer",
        email: "buyer@example.com",
        registered: true,
      });
    }
    if (url.hostname === "securetoken.googleapis.com")
      return json({
        access_token: jwt(),
        id_token: jwt(),
        refresh_token: "refresh",
        expires_in: "3600",
        user_id: "test-buyer",
        token_type: "Bearer",
      });
    if (url.pathname.startsWith("/api/")) {
      const body = req.postData() ? req.postDataJSON() : {};
      if (url.pathname === "/api/auth/sync") {
        if (state.syncFailures-- > 0)
          return json({ error: "Sync unavailable" }, 503);
        return json({
          user: {
            id: "airtable-user",
            firebaseUid: "test-buyer",
            hasBuyBox: !!state.box,
          },
        });
      }
      if (url.pathname === "/api/deals")
        return json({ deals: [deal], count: 1 });
      if (url.pathname === "/api/deals/map-locations")
        return json({ locations: {}, pending: 0 });
      if (url.pathname === `/api/deals/${id}`)
        return state.detailStatus === 200
          ? json({ deal })
          : json({ error: "Unavailable" }, state.detailStatus);
      if (url.pathname === "/api/buyers/buybox") {
        if (req.method() !== "GET") {
          state.box = { ...state.box, ...body, id: "box" };
          return json({ buyBox: state.box });
        }
        return state.box
          ? json({ buyBox: state.box })
          : json({ error: "Missing" }, 404);
      }
      if (url.pathname === "/api/buyers/match-settings") {
        if (req.method() !== "GET") state.settings = body;
        return json({ settings: state.settings });
      }
      if (url.pathname.startsWith("/api/matches")) {
        if (!state.box)
          return json(
            { error: "Set up Buy Box", code: "BUY_BOX_REQUIRED" },
            400,
          );
        const matched = {
          ...deal,
          matchScore: state.score,
          matchReasons: ["Located in your preferred state"],
          isMatched: true,
        };
        return url.pathname === "/api/matches"
          ? json({ matches: [matched], scores: [matched] })
          : json(matched);
      }
      if (url.pathname === "/api/favorites")
        return json({ ids: state.favorites });
      if (url.pathname === `/api/favorites/${id}`) {
        state.favorites = body.saved ? [id] : [];
        return json({ success: true });
      }
      return json({ error: "Unmocked API route" }, 500);
    }
    if (url.hostname === "127.0.0.1") return route.continue();
    // Never contact real services, tile servers, analytics or image hosts in tests.
    return route.fulfill({ status: 200, body: "" });
  });
  return state;
}
async function login(page) {
  await page.goto("/login");
  await page
    .getByRole("button", { name: "Log In", exact: true })
    .last()
    .click();
  await page
    .getByRole("textbox", { name: "Email", exact: true })
    .fill("buyer@example.com");
  await page.getByLabel("Password", { exact: true }).fill("test-password-123");
  await page.getByRole("button", { name: "Sign In", exact: true }).click();
  await expect(page).toHaveURL(/\/deals$/);
}
async function grid(page) {
  await page.getByRole("button", { name: "Grid View", exact: true }).click();
}
async function noOverflow(page) {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth + 1,
    ),
  ).toBe(true);
}

test("signup → verification → new Buy Box → settings → matching → property inquiry → saved deals", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const state = await fixtures(page);
  await page.goto("/login?mode=signup");
  await page.getByLabel("Email", { exact: true }).fill("buyer@example.com");
  await page.getByLabel("Password", { exact: true }).fill("test-password-123");
  await page.getByRole("button", { name: "Sign Up", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "I've verified my email" }),
  ).toBeVisible();
  await expect.poll(() => state.outbox).toContain("VERIFY_EMAIL");
  state.verified = true;
  await page.getByRole("button", { name: "I've verified my email" }).click();
  await expect(
    page.getByRole("button", { name: "I've verified my email" }),
  ).toHaveCount(0);
  await page.goto("/my-buy-box");
  await page.getByLabel("Preferred states").fill("TX");
  await page.getByLabel("Max entry fee").fill("50000");
  await page.getByLabel("Min bathrooms").fill("1.5");
  await page.getByRole("button", { name: "Subto", exact: true }).click();
  await page.getByRole("button", { name: "Save Buy Box", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Buy Box saved.");
  await page.getByLabel("Zip code", { exact: true }).fill("75201");
  await page.getByLabel("Radius (miles)").fill("25");
  await page
    .getByRole("button", { name: "Save Match Settings", exact: true })
    .click();
  await expect(
    page.getByText("Match settings saved.", { exact: true }),
  ).toBeVisible();
  await noOverflow(page);
  const a11y = await new AxeBuilder({ page })
    .include("form")
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  expect(a11y.violations).toEqual([]);
  await page
    .getByRole("link", { name: "View your matches", exact: true })
    .click();
  await grid(page);
  await page
    .getByRole("combobox", { name: "Sort by entry fee" })
    .selectOption("match");
  await page.getByLabel("My matches (50%+)").check();
  await expect(page.getByRole("heading", { name: deal.address })).toBeVisible();
  expect(
    (
      await new AxeBuilder({ page })
        .include("main")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.getByRole("button", { name: "Save deal", exact: true }).click();
  await expect.poll(() => state.favorites).toEqual([id]);
  await page.reload();
  await grid(page);
  await expect(
    page.getByRole("button", { name: "Unsave deal", exact: true }),
  ).toBeVisible();
  await page.goto(`/deals/${id}`);
  await expect(
    page.getByRole("heading", { name: "92% match with your Buy Box" }),
  ).toBeVisible();
  await expect(page.getByText("Located in your preferred state")).toBeVisible();
  const inquiry = page.getByRole("link", { name: "Ask about this property" });
  expect(decodeURIComponent(await inquiry.getAttribute("href"))).toContain(
    `Listing: http://127.0.0.1:4173/deals/${id}`,
  );
  await noOverflow(page);
  expect(
    (
      await new AxeBuilder({ page })
        .include(".public-site")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  expect(errors).toEqual([]);
});

test("existing Buy Box loads, edits persist, and scores appear in browse views", async ({
  page,
}) => {
  const state = await fixtures(page, {
    verified: true,
    box: {
      preferredStates: "TX",
      entryFeeMax: 40000,
      buyingStrategies: "Subto",
    },
  });
  await login(page);
  await page.goto("/my-buy-box");
  await expect(page.getByLabel("Max entry fee")).toHaveValue("40000");
  await page.getByLabel("Max entry fee").fill("60000");
  await page.getByRole("button", { name: "Save Buy Box", exact: true }).click();
  await expect.poll(() => state.box.entryFeeMax).toBe(60000);
  await page.getByRole("link", { name: "View your matches" }).click();
  await grid(page);
  await expect(page.getByRole("heading", { name: deal.address })).toBeVisible();
  await expect(page.getByText("92", { exact: true })).toBeVisible();
});

test("forgot password sends reset request and verification can be resent", async ({
  page,
}) => {
  const state = await fixtures(page);
  await page.goto("/login");
  await page
    .getByRole("button", { name: "Log In", exact: true })
    .last()
    .click();
  await page.getByRole("button", { name: "Forgot password?" }).click();
  await page.getByLabel("Email", { exact: true }).fill("buyer@example.com");
  await page
    .getByRole("button", { name: "Send reset link", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText("If an account exists");
  expect(state.outbox).toContain("PASSWORD_RESET");
  await page.getByRole("button", { name: "Back to sign in" }).click();
  await page.getByLabel("Password", { exact: true }).fill("test-password-123");
  await page.getByRole("button", { name: "Sign In", exact: true }).click();
  await page.getByRole("button", { name: "Resend verification email" }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "Verification email sent" }),
  ).toBeVisible();
  expect(state.outbox).toContain("VERIFY_EMAIL");
});

test("account sync failures are visible and retry restores matching", async ({
  page,
}) => {
  await fixtures(page, {
    verified: true,
    box: { preferredStates: "TX" },
    syncFailures: 1,
  });
  await login(page);
  await expect(page.getByRole("alert")).toContainText(
    "account could not finish loading",
  );
  await page.getByRole("button", { name: "Retry account sync" }).click();
  await expect(
    page.getByRole("button", { name: "Retry account sync" }),
  ).toHaveCount(0);
  await grid(page);
  await expect(page.getByText("92", { exact: true })).toBeVisible();
});

test("unknown pages and unavailable listings offer recovery; login form is keyboard accessible", async ({
  page,
}) => {
  await fixtures(page, { detailStatus: 404 });
  await page.goto("/unknown-route");
  await expect(
    page.getByRole("heading", { name: "Page not found" }),
  ).toBeVisible();
  await page.goto(`/deals/${id}`);
  await expect(page.getByRole("alert")).toContainText("no longer available");
  await page.getByRole("link", { name: "Back to Buy Deals" }).click();
  await expect(page).toHaveURL(/\/deals$/);
  await page.goto("/login");
  await page
    .getByRole("button", { name: "Log In", exact: true })
    .last()
    .click();
  await page.getByLabel("Email", { exact: true }).focus();
  await page.keyboard.press("Tab");
  await expect(page.getByLabel("Password", { exact: true })).toBeFocused();
  const a11y = await new AxeBuilder({ page })
    .include("form")
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  expect(a11y.violations).toEqual([]);
  await noOverflow(page);
});

test("render failures show a recoverable application error", async ({
  page,
}) => {
  await fixtures(page);
  await page.route("**/src/pages/AboutPage.jsx", (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: 'export default function BrokenPage() { throw new Error("simulated render failure"); }',
    }),
  );
  await page.goto("/about");
  await expect(
    page.getByRole("heading", { name: "Something went wrong" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Reload page" })).toBeVisible();
  await page.getByRole("link", { name: "Return home" }).click();
  await expect(page).toHaveURL("/");
});
