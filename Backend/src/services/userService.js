const base = require("../config/airtable");
const { USERS_TABLE, UserFields, formatUser } = require("../models/User");

async function findByFirebaseUid(uid) {
  const records = await base(USERS_TABLE)
    .select({
      filterByFormula: `{${UserFields.FIREBASE_UID}} = '${uid}'`,
      maxRecords: 1,
    })
    .firstPage();

  if (records.length === 0) return null;
  return formatUser(records[0]);
}

async function findByEmail(email) {
  const records = await base(USERS_TABLE)
    .select({
      filterByFormula: `{${UserFields.EMAIL}} = '${email}'`,
      maxRecords: 1,
    })
    .firstPage();

  if (records.length === 0) return null;
  return formatUser(records[0]);
}

async function createUser(data) {
  const records = await base(USERS_TABLE).create([
    {
      fields: {
        [UserFields.FIREBASE_UID]: data.uid,
        [UserFields.EMAIL]: data.email || "",
        [UserFields.NAME]: data.name || "",
        [UserFields.ROLE]: data.role || "investor",
      },
    },
  ]);

  return formatUser(records[0]);
}

async function updateUser(recordId, fields) {
  const records = await base(USERS_TABLE).update([
    {
      id: recordId,
      fields,
    },
  ]);

  return formatUser(records[0]);
}

module.exports = { findByFirebaseUid, findByEmail, createUser, updateUser };