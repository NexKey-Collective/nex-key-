const base = require("../config/Airtable");

const USERS_TABLE = "Users";

const userSetup = async (firebaseUser) => {
  const { uid, email, name } = firebaseUser;

  // Check if user already exists in Airtable
  const existing = await base(USERS_TABLE)
    .select({
      filterByFormula: `{firebaseUid} = '${uid}'`,
      maxRecords: 1,
    })
    .firstPage();

  if (existing.length > 0) {
    const record = existing[0];
    return {
      id: record.id,
      ...record.fields,
    };
  }

  // Create new user
  const newRecord = await base(USERS_TABLE).create([
    {
      fields: {
        firebaseUid: uid,
        email: email || "",
        name: name || "",
        role: "investor", // default role
      },
    },
  ]);

  const created = newRecord[0];
  return {
    id: created.id,
    ...created.fields,
  };
};

module.exports = userSetup;