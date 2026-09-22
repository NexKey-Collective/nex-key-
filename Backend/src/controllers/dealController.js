const dealService = require("../services/dealService");
const { parseDealFilters } = require("../utils/dealFilters");
const { toListDeal } = require("../models/Deal");

const getDeals = async (req, res) => {
  try {
    // If search query provided, use search
    if (req.query.q) {
      const deals = await dealService.searchDeals(req.query.q);
      return res.status(200).json({ deals: deals.map(toListDeal), count: deals.length });
    }

    // Otherwise use structured filters
    const filters = parseDealFilters(req.query);
    const hasFilters = Object.keys(filters).length > 0;

    const deals = hasFilters
      ? await dealService.getDealsWithFilters(filters)
      : await dealService.getAllDeals();

    // Trim to the fields the list grid renders — the full records (used
    // internally for filtering) carry a lot of detail-only data that would
    // otherwise double the response size for no benefit here.
    return res.status(200).json({ deals: deals.map(toListDeal), count: deals.length });
  } catch (error) {
    console.error("Get deals error:", error);
    return res.status(500).json({ error: "Failed to fetch deals" });
  }
};

const getDealById = async (req, res) => {
  try {
    const deal = await dealService.getDealById(req.params.id);
    return res.status(200).json({ deal });
  } catch (error) {
    console.error("Get deal error:", error);
    return res.status(404).json({ error: "Deal not found" });
  }
};

module.exports = { getDeals, getDealById };