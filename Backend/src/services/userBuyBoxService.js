const base = require("../config/airtable");
const { BUYBOX_TABLE, BuyBoxFields, formatBuyBox, normalizeListFields } = require("../models/BuyBox");
const { escapeFormulaValue } = require("../utils/airtableFormula");

async function findByUserId(userId) {
  const records = await base(BUYBOX_TABLE)
    .select({
      filterByFormula: `{${BuyBoxFields.USER_ID}} = '${escapeFormulaValue(userId)}'`,
      maxRecords: 1,
    })
    .firstPage();

  if (records.length === 0) return null;
  return formatBuyBox(records[0]);
}

async function createForUser(userId, fields) {
  const records = await base(BUYBOX_TABLE).create([
    {
      fields: {
        ...normalizeListFields(fields),
        [BuyBoxFields.USER_ID]: userId,
        [BuyBoxFields.SUBMITTED_AT]: new Date().toISOString().split("T")[0],
      },
    },
  ]);

  return formatBuyBox(records[0]);
}

async function updateByUserId(userId, fields) {
  const existing = await findByUserId(userId);
  if (!existing) return null;

  const records = await base(BUYBOX_TABLE).update([
    {
      id: existing.id,
      fields: normalizeListFields(fields),
    },
  ]);

  return formatBuyBox(records[0]);
}

async function deleteByUserId(userId) {
  const existing = await findByUserId(userId);
  if (!existing) return false;

  await base(BUYBOX_TABLE).destroy([existing.id]);
  return true;
}

module.exports = { 
  findByUserId, 
  createForUser, 
  updateByUserId, 
  deleteByUserId 
};
