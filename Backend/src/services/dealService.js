const base = require("../config/airtable");
const { DEALS_TABLE, DealFields, formatDeal } = require("../models/Deal");
const { createDealsCache } = require("../utils/dealsCache");

// Keep fields consumed by the formatter: this cache also serves matching and maps.
// Detail requests still fetch the full record directly from Airtable.
const DEAL_QUERY = {
  filterByFormula: `{${DealFields.DEAL_STATUS}} = 'Available'`,
  fields: [...Object.values(DealFields), "Latitude", "Longitude"],
};
const getCachedDeals = createDealsCache(async () => {
  const records = await base(DEALS_TABLE).select(DEAL_QUERY).all();
  return records.map(formatDeal).filter((deal) => deal.dealStatus === "Available");
});

async function getAllDeals() {
  return getCachedDeals();
}

async function getDealById(recordId) {
  const record = await base(DEALS_TABLE).find(recordId);
  return formatDeal(record);
}

async function getDealsWithFilters(filters) {
  const deals = await getCachedDeals();

  return deals.filter((deal) => {
    if (filters.dealType && deal.dealType !== filters.dealType) return false;
    if (filters.state && deal.state !== filters.state) return false;
    if (filters.city && deal.city !== filters.city) return false;

    if (filters.minBeds && !(Number(deal.bedCount) >= filters.minBeds)) return false;
    if (filters.minBaths && !(Number(deal.bathCount) >= filters.minBaths)) return false;

    if (filters.minEntryFee && !(deal.entryFee >= filters.minEntryFee)) return false;
    if (filters.maxEntryFee && !(deal.entryFee <= filters.maxEntryFee)) return false;

    if (filters.furnished && deal.furnished !== filters.furnished) return false;
    if (filters.hasPool && deal.hasPool !== filters.hasPool) return false;
    if (filters.multiUnit && deal.multiUnit !== filters.multiUnit) return false;

    if (filters.monthlyMin && !(deal.totalMonthlyPayment >= filters.monthlyMin)) return false;
    if (filters.monthlyMax && !(deal.totalMonthlyPayment <= filters.monthlyMax)) return false;

    if (filters.exitStrategies && filters.exitStrategies.length > 0) {
      const hasMatch = filters.exitStrategies.some((strategy) =>
        deal.exitStrategies.includes(strategy)
      );
      if (!hasMatch) return false;
    }

    return true;
  });
}

async function searchDeals(query) {
  const searchTerm = query.toLowerCase();
  const deals = await getCachedDeals();

  return deals.filter((deal) =>
    [deal.address, deal.city, deal.state, deal.fullAddress, deal.zipCode, deal.dealType]
      .some((field) => String(field).toLowerCase().includes(searchTerm))
  );
}

// Warm the cache as soon as the server boots instead of waiting for the
// first request to pay the 10s Airtable cost.
getCachedDeals().catch((error) => {
  console.error("Failed to warm deals cache on boot:", error);
});

module.exports = { getAllDeals, getDealById, getDealsWithFilters, searchDeals };
