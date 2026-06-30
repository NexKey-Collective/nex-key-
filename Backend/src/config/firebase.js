const admin = require("firebase-admin");

console.log("[firebase] FIREBASE_SERVICE_ACCOUNT set:", !!process.env.FIREBASE_SERVICE_ACCOUNT);

let serviceAccount;
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  throw new Error("FIREBASE_SERVICE_ACCOUNT environment variable is not set. Cannot start without it.");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;