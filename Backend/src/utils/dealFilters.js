function parseDealFilters(query) {
  const filters = {};

  if (query.dealType) {
    filters.dealType = query.dealType;
  }

  if (query.state) {
    filters.state = query.state;
  }

  if (query.city) {
    filters.city = query.city;
  }

  if (query.minBeds) {
    filters.minBeds = parseInt(query.minBeds, 10);
  }

  if (query.minBaths) {
    filters.minBaths = parseInt(query.minBaths, 10);
  }

  if (query.minEntryFee) {
    filters.minEntryFee = parseFloat(query.minEntryFee);
  }

  if (query.maxEntryFee) {
    filters.maxEntryFee = parseFloat(query.maxEntryFee);
  }

  if (query.furnished) {
    filters.furnished = query.furnished;
  }

  if (query.hasPool) {
    filters.hasPool = query.hasPool;
  }

  if (query.multiUnit) {
    filters.multiUnit = query.multiUnit;
  }

  return filters;
}

module.exports = { parseDealFilters };