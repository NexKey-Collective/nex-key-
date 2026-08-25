const base = require("../config/airtable");
const { DEALS_TABLE, formatDeal } = require("../models/Deal");

// Airtable paginates the ~1000-row Deals table into ~10 sequential requests,
// so a live fetch takes 10s+. Cache the full formatted list in memory and
// re-filter it in JS instead of round-tripping to Airtable on every request.
const CACHE_TTL_MS = 60 * 1000;
let cache = { deals: null, fetchedAt: 0 };
let inflight = null;

async function getCachedDeals() {
  const isFresh = cache.deals && Date.now() - cache.fetchedAt < CACHE_TTL_MS;
  if (isFresh) return cache.deals;

  if (!inflight) {
    inflight = base(DEALS_TABLE)
      .select()
      .all()
      .then((records) => {
        const deals = records.map(formatDeal);
        cache = { deals, fetchedAt: Date.now() };
        inflight = null;
        return deals;
      })
      .catch((error) => {
        inflight = null;
        throw error;
      });
  }

  return inflight;
}

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

module.exports = { getAllDeals, getDealById, getDealsWithFilters, searchDeals };
