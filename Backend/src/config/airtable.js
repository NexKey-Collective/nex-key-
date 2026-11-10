const Airtable = require("airtable");

const base = new Airtable({
  apiKey: process.env.AIRTABLE_TOKEN,
  requestTimeout: 10000,
  noRetryIfRateLimited: true,
}).base(process.env.BASE_ID);

module.exports = base;
