const base = require("../config/airtable");
const { DEALS_TABLE, DealFields, formatDeal } = require("../models/Deal");

async function getAllDeals() {
  const records = await base(DEALS_TABLE).select().all();
  return records.map(formatDeal);
}

async function getDealById(recordId) {
  const record = await base(DEALS_TABLE).find(recordId);
  return formatDeal(record);
}

async function getDealsWithFilters(filters) {
  const formulas = [];

  if (filters.dealType) {
    formulas.push(`{${DealFields.DEAL_TYPE}} = '${filters.dealType}'`);
  }

  if (filters.state) {
    formulas.push(`{${DealFields.STATE}} = '${filters.state}'`);
  }

  if (filters.minBeds) {
    formulas.push(`VALUE({${DealFields.BED_COUNT}}) >= ${filters.minBeds}`);
  }

  if (filters.minBaths) {
    formulas.push(`VALUE({${DealFields.BATH_COUNT}}) >= ${filters.minBaths}`);
  }

  if (filters.maxEntryFee) {
    formulas.push(`{${DealFields.ENTRY_FEE}} <= ${filters.maxEntryFee}`);
  }

  if (filters.minEntryFee) {
    formulas.push(`{${DealFields.ENTRY_FEE}} >= ${filters.minEntryFee}`);
  }

  if (filters.furnished) {
    formulas.push(`{${DealFields.FURNISHED}} = '${filters.furnished}'`);
  }

  if (filters.hasPool) {
    formulas.push(`{${DealFields.HAS_POOL}} = '${filters.hasPool}'`);
  }

  if (filters.multiUnit) {
    formulas.push(`{${DealFields.MULTI_UNIT}} = '${filters.multiUnit}'`);
  }

  if (filters.city) {
    formulas.push(`{${DealFields.CITY}} = '${filters.city}'`);
  }

  const filterFormula =
    formulas.length > 0 ? `AND(${formulas.join(", ")})` : "";

  const selectOptions = {};
  if (filterFormula) {
    selectOptions.filterByFormula = filterFormula;
  }

  const records = await base(DEALS_TABLE).select(selectOptions).all();
  return records.map(formatDeal);
}

async function searchDeals(query) {
  const searchTerm = query.toLowerCase();

  const filterFormula = `OR(
    FIND("${searchTerm}", LOWER({${DealFields.ADDRESS}})),
    FIND("${searchTerm}", LOWER({${DealFields.CITY}})),
    FIND("${searchTerm}", LOWER({${DealFields.STATE}})),
    FIND("${searchTerm}", LOWER({${DealFields.FULL_ADDRESS}})),
    FIND("${searchTerm}", LOWER({${DealFields.ZIP_CODE}})),
    FIND("${searchTerm}", LOWER({${DealFields.DEAL_TYPE}}))
  )`;

  const records = await base(DEALS_TABLE)
    .select({ filterByFormula: filterFormula })
    .all();

  return records.map(formatDeal);
}

module.exports = { getAllDeals, getDealById, getDealsWithFilters, searchDeals };