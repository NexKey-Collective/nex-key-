const zipcodes = require("zipcodes");

// Defaults preserve the original hardcoded point values.
// `state` + `city` (25 + 5 = 30) are used when a buyer has no zip/radius set;
// `location` (30) is used instead when they do, via zip-radius distance matching.
const DEFAULT_WEIGHTS = {
  dealType: 30,
  location: 30,
  state: 25,
  city: 5,
  entryFee: 20,
  exitStrategy: 15,
  bedrooms: 7,
  bathrooms: 6,
};

function toList(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : value.split(", ");
}

function hasZipRadius(userBuyBox) {
  return Boolean(userBuyBox.zipCode && userBuyBox.radiusMiles);
}

// Returns distance in miles, or null if it can't be computed (missing/invalid zip).
function distanceToDeal(deal, userBuyBox) {
  if (!deal.zipCode || !userBuyBox.zipCode) return null;
  const distance = zipcodes.distance(String(userBuyBox.zipCode), String(deal.zipCode));
  return Number.isFinite(distance) ? distance : null;
}

// Scores a deal against a buyer's Buy Box and explains the score in one pass,
// so distance/list-parsing isn't repeated (and can't drift) across two calls.
function evaluateMatch(deal, userBuyBox, weights = DEFAULT_WEIGHTS) {
  const w = { ...DEFAULT_WEIGHTS, ...weights };
  let score = 0;
  let maxScore = 0;
  const reasons = [];

  // 1. DEAL TYPE
  const strategies = toList(userBuyBox.buyingStrategies);
  if (strategies.length > 0) {
    maxScore += w.dealType;
    if (strategies.includes(deal.dealType)) {
      score += w.dealType;
      reasons.push(`✅ Deal type matches (${deal.dealType})`);
    }
  }

  // 2. LOCATION - zip/radius when the buyer has set it, otherwise exact state/city
  if (hasZipRadius(userBuyBox)) {
    maxScore += w.location;
    const distance = distanceToDeal(deal, userBuyBox);
    if (distance !== null) {
      if (distance <= userBuyBox.radiusMiles) {
        score += w.location;
        reasons.push(
          `✅ ${distance} mi from ${userBuyBox.zipCode} (within ${userBuyBox.radiusMiles} mi radius)`
        );
      } else {
        reasons.push(
          `⚠️ ${distance} mi from ${userBuyBox.zipCode} (outside ${userBuyBox.radiusMiles} mi radius)`
        );
      }
    }
  } else {
    const states = toList(userBuyBox.preferredStates);
    if (states.length > 0) {
      maxScore += w.state;
      if (states.includes(deal.state)) {
        score += w.state;
        reasons.push(`✅ Located in ${deal.state} (preferred state)`);
      }
    }

    // Note: city, unlike state, only counts toward maxScore when it matches
    // (preserves original scoring behavior — not a criterion that can be "missed").
    const cities = toList(userBuyBox.preferredCities);
    if (cities.length > 0 && cities.includes(deal.city)) {
      score += w.city;
      maxScore += w.city;
      reasons.push(`✅ Located in ${deal.city} (preferred city)`);
    }
  }

  // 3. ENTRY FEE
  if (userBuyBox.entryFeeMax) {
    maxScore += w.entryFee;
    if (deal.entryFee && deal.entryFee <= userBuyBox.entryFeeMax) {
      score += w.entryFee;
      reasons.push(
        `✅ Entry fee $${deal.entryFee.toLocaleString()} (within budget of $${userBuyBox.entryFeeMax.toLocaleString()})`
      );
    } else if (deal.entryFee && deal.entryFee <= userBuyBox.entryFeeMax * 1.1) {
      // 10% over: partial credit
      score += w.entryFee / 2;
      reasons.push(
        `⚠️ Entry fee $${deal.entryFee.toLocaleString()} (slightly above budget of $${userBuyBox.entryFeeMax.toLocaleString()})`
      );
    }
  }

  // 4. EXIT STRATEGIES
  if (strategies.length > 0) {
    maxScore += w.exitStrategy;
    const matchingExit = deal.exitStrategies?.filter(es => strategies.includes(es)) || [];
    if (matchingExit.length > 0) {
      score += w.exitStrategy;
      reasons.push(`✅ Supports exit strategies: ${matchingExit.join(", ")}`);
    }
  }

  // 5. BEDROOMS
  if (userBuyBox.bedroomsMin) {
    maxScore += w.bedrooms;
    if (deal.bedCount && parseInt(deal.bedCount) >= userBuyBox.bedroomsMin) {
      score += w.bedrooms;
      reasons.push(
        `✅ ${deal.bedCount} bedrooms (meets minimum of ${userBuyBox.bedroomsMin})`
      );
    }
  }

  // 6. BATHROOMS
  if (userBuyBox.bathroomsMin) {
    maxScore += w.bathrooms;
    if (deal.bathCount && parseInt(deal.bathCount) >= userBuyBox.bathroomsMin) {
      score += w.bathrooms;
      reasons.push(
        `✅ ${deal.bathCount} bathrooms (meets minimum of ${userBuyBox.bathroomsMin})`
      );
    }
  }

  const matchScore = maxScore === 0 ? 0 : Math.round((score / maxScore) * 100);
  return { score: matchScore, reasons };
}

module.exports = { evaluateMatch, DEFAULT_WEIGHTS };
