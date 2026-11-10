# Production release and operations

## Local setup

Use Node 22.12 or newer within the Node 22 line (`nvm use`). Run `npm ci --prefix Backend` and `npm ci --prefix Frontend`.
Copy each `.env.example` to `.env` (backend) / `.env.local` (frontend); fill values from the intended environment. Never commit credentials. Backend requires the Airtable token/base and Firebase service account. The frontend Firebase defaults remain the current project; use all `VITE_FIREBASE_*` overrides for a separate staging project. Enable Email/Password and Google providers and authorize each frontend hostname in Firebase Authentication.

Run `npm run dev --prefix Backend` and `npm run dev --prefix Frontend` in separate terminals. Test with `npm test --prefix Backend`, `npm test --prefix Frontend`, `npm run build --prefix Frontend`, and `npm run test:e2e --prefix Frontend` (first install browsers: `cd Frontend && npx playwright install chromium`). Browser tests intercept external services and never send customer email or write production data.

## Railway backend

The checked-in Dockerfile uses a repository-root build context and Node 22. In Railway service settings, set **Root Directory `/`**, **Config File `/railway.toml`**, and remove conflicting custom build/start commands. Docker copies only the backend and installs its locked production dependencies. This repository cannot prove the current dashboard setting: verify it before releasing. Do not set Root Directory to `/Backend` with this Dockerfile.

Set `NODE_ENV=production`, `AIRTABLE_TOKEN`, `BASE_ID`, `FIREBASE_SERVICE_ACCOUNT`, `ALLOWED_ORIGINS` (comma-separated exact frontend origins, no paths/trailing slash), and `GHL_WEBHOOK_SECRET`. Configure GHL's `x-webhook-secret` header to match before deploying: missing secret deliberately disables webhook access. Set `TRUST_PROXY_HOPS` only after checking the ingress topology; for one trusted proxy use `1`. Never use an unrestricted trust proxy setting. Keep one replica until a shared gateway rate limiter and transactional identity store are configured; the current limiter is per process.

Railway uses `/ready` to gate a new deployment. It checks Airtable and Firestore and caches success for 30 seconds; `/health` reports process liveness. Service account must access `buyerMatchSettings`, `matchRecords`, `userMatchState`, and `buyerFavorites` collections. Firebase Admin bypasses Firestore client rules: keep direct client access denied and grant only required service-account permissions.

The Docker image provides `/app/.cache` writable by its non-root user. If Census geocoding is enabled, mount a persistent Railway volume there and verify its ownership for UID 1000; otherwise cache is lost on deployment.

## Frontend hosting

Set `VITE_API_URL` to the deployed backend `/api` URL before building. Run `npm ci` and `npm run build` from `Frontend`; publish `Frontend/dist`. Keep SPA fallback enabled (`wrangler.toml` / `Frontend/vercel.json`). Add the actual frontend origin to backend `ALLOWED_ORIGINS` and Firebase authorized domains. Firebase-hosted email action handlers complete verification/reset; customize their email templates and authorized domains in the Firebase console. Test email delivery with a staging mailbox.

## Release verification

1. Pass CI and inspect the browser test report. CI uses mocked external services; it does not certify cloud configuration.
2. In staging, create an email/password user, receive verification email, follow its link, and select **I've verified my email**. Confirm successful account sync. Verify Google login too.
3. Seed a GHL Buy Box for a staging email. Confirm a verified account sees it, including a legacy Airtable user-ID link. Ensure another account cannot read/edit it. Unverified accounts cannot claim submissions.
4. Create/edit criteria and ZIP/radius/weights, then open deals. Check scores, explanations, best-match sort, and matches filter; verify changed settings affect results. Test no Buy Box and zero matches.
5. Save/unsave deals, reload and sign in on another device; verify isolation between users. Legacy browser favorites import once after successful upload.
6. Open a property and verify inquiry email includes its address/link (do not send to the business inbox during automated checks). Verify sold listing and upstream outage messages, and unknown-route recovery.
7. Request password reset with a staging mailbox; complete the reset and log in with the new password. Verify sync failure/retry and a backend outage.
8. Send a GHL staging event with missing/wrong/correct secret; check rejected/rejected/success. Confirm no customer payload appears in logs.

## Monitoring

The API writes JSON request logs containing request ID, method, path, status and duration; no authorization headers, request bodies, or query strings. Use Railway logs to inspect error rates and latency and correlate `X-Request-ID`. Configure an external uptime monitor for `/health` and `/ready` every minute, alert on repeated failures (e.g. 3 consecutive), and configure Railway restart/deployment-failure alerts. Monitor HTTP 429/5xx and Airtable quota usage. Provider dashboards/alert destinations must be connected by an operator; no external monitor has been provisioned by this change.

Airtable transport times out at 10s; read operations have a deadline and one bounded retry on transient 5xx. Writes are not retried automatically because uncertain writes can duplicate records. 429 returns promptly; cache refresh backs off 30s. Firestore RPC retry budget is 15s. Map geocoding remains optional background work. API client reads retry once; account/favorites writes require an explicit retry.

## Rollback and data

Before release record the last successful Railway deployment and frontend artifact/commit. If readiness fails, Railway should retain the previous healthy deployment; confirm behavior in the service. For regressions redeploy the previous successful Railway image and matching frontend artifact. Restore environment values separately if changed. Do not reset user data as part of code rollback.

This release stores favorites in Firestore under `buyerFavorites/{uid}/deals/{dealId}`. Older frontends cannot show cloud favorites. Verified account sync upgrades a matching legacy Buy Box `userId` from Airtable ID to Firebase UID; record affected staging/production records before rollout and preserve their original values in your normal backup. Schedule Airtable exports and Firestore backups and verify a restore in staging. Existing duplicate Buy Boxes and conflicting identity links require operator review; they are not bulk-rewritten automatically.

## Product scope

Daily personalized notifications are not implemented by this application. Copy now promises personalized scores while browsing. Enable alert promises only after an independently verified GHL notification workflow, user consent/unsubscribe handling, and delivery monitoring exist. Property inquiries open the user's email application; automated CRM inquiry capture is not implemented.

## Implementation references

- [Firebase user recovery and verification](https://firebase.google.com/docs/auth/web/manage-users)
- [Firebase authentication dependency setup](https://firebase.google.com/docs/auth/web/custom-dependencies)
- [Railway monorepo root/config settings](https://docs.railway.com/deployments/monorepo)
- [Vite 7 Node requirements](https://v7.vite.dev/guide/migration.html)
