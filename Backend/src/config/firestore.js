const admin = require("./firebase");
const db = admin.firestore();
const methods = Object.fromEntries(
  [
    "GetDocument",
    "BatchGetDocuments",
    "RunQuery",
    "Commit",
    "Write",
    "DeleteDocument",
  ].map((name) => [name, { timeout_millis: 10000 }]),
);
// Bound transport deadlines and the SDK's retry budget for backend RPCs.
db.settings({
  clientConfig: {
    interfaces: {
      "google.firestore.v1.Firestore": {
        methods,
        retry_params: {
          default: {
            initial_retry_delay_millis: 100,
            retry_delay_multiplier: 1.3,
            max_retry_delay_millis: 1000,
            initial_rpc_timeout_millis: 10000,
            rpc_timeout_multiplier: 1,
            max_rpc_timeout_millis: 10000,
            total_timeout_millis: 15000,
          },
        },
      },
    },
  },
});
module.exports = db;
