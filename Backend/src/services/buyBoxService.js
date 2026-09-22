const base = require("../config/airtable");
const { BUYBOX_TABLE, BuyBoxFields, formatBuyBox } = require("../models/BuyBox");
const { escapeFormulaValue } = require("../utils/airtableFormula");

async function findByEmail(email) {
  const records = await base(BUYBOX_TABLE)
    .select({
      filterByFormula: `{${BuyBoxFields.EMAIL}} = '${escapeFormulaValue(email)}'`,
      maxRecords: 1,
    })
    .firstPage();

  if (records.length === 0) return null;
  return formatBuyBox(records[0]);
}

async function findByGhlContactId(contactId) {
  const records = await base(BUYBOX_TABLE)
    .select({
      filterByFormula: `{${BuyBoxFields.GHL_CONTACT_ID}} = '${escapeFormulaValue(contactId)}'`,
      maxRecords: 1,
    })
    .firstPage();

  if (records.length === 0) return null;
  return formatBuyBox(records[0]);
}

async function createBuyBox(fields) {
  const records = await base(BUYBOX_TABLE).create([{ fields }]);
  return formatBuyBox(records[0]);
}

async function updateBuyBox(recordId, fields) {
  const records = await base(BUYBOX_TABLE).update([
    {
      id: recordId,
      fields,
    },
  ]);
  return formatBuyBox(records[0]);
}

async function linkUser(recordId, userId) {
  return updateBuyBox(recordId, { [BuyBoxFields.USER_ID]: userId });
}

module.exports = { findByEmail, findByGhlContactId, createBuyBox, updateBuyBox, linkUser };