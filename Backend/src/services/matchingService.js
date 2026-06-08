function calculateMatchScore(deal, userBuyBox) {
  let score = 0;
  let maxScore = 0;

  // 1. DEAL TYPE (30 points)
  if (userBuyBox.buyingStrategies) {
    const strategies = Array.isArray(userBuyBox.buyingStrategies)
      ? userBuyBox.buyingStrategies
      : userBuyBox.buyingStrategies.split(", ");

    if (strategies && strategies.length > 0) {
      maxScore += 30;
      if (strategies.includes(deal.dealType)) {
        score += 30;
      }
    }
  }

  // 2. STATE (25 points)
  if (userBuyBox.preferredStates) {
    const states = Array.isArray(userBuyBox.preferredStates)
      ? userBuyBox.preferredStates
      : userBuyBox.preferredStates.split(", ");

    if (states && states.length > 0) {
      maxScore += 25;
      if (states.includes(deal.state)) {
        score += 25;
      }
    }
  }

  // 3. CITY (bonus 5 points)
  if (userBuyBox.preferredCities) {
    const cities = Array.isArray(userBuyBox.preferredCities)
      ? userBuyBox.preferredCities
      : userBuyBox.preferredCities.split(", ");

    if (cities && cities.length > 0 && cities.includes(deal.city)) {
      score += 5;
      maxScore += 5;
    }
  }

  // 4. ENTRY FEE (20 points)
  if (userBuyBox.entryFeeMax) {
    maxScore += 20;
    if (deal.entryFee && deal.entryFee <= userBuyBox.entryFeeMax) {
      score += 20;
    } else if (deal.entryFee && deal.entryFee <= userBuyBox.entryFeeMax * 1.1) {
      // 10% over: partial credit
      score += 10;
    }
  }

  // 5. EXIT STRATEGIES (15 points)
  if (userBuyBox.buyingStrategies) {
    const strategies = Array.isArray(userBuyBox.buyingStrategies)
      ? userBuyBox.buyingStrategies
      : userBuyBox.buyingStrategies.split(", ");

    if (strategies && strategies.length > 0) {
      maxScore += 15;
      const hasMatchingExit = deal.exitStrategies?.some(es =>
        strategies.includes(es)
      );
      if (hasMatchingExit) {
        score += 15;
      }
    }
  }

  // 6. BEDROOMS (7 points)
  if (userBuyBox.bedroomsMin) {
    maxScore += 7;
    if (deal.bedCount && parseInt(deal.bedCount) >= userBuyBox.bedroomsMin) {
      score += 7;
    }
  }

  // 7. BATHROOMS (6 points)
  if (userBuyBox.bathroomsMin) {
    maxScore += 6;
    if (deal.bathCount && parseInt(deal.bathCount) >= userBuyBox.bathroomsMin) {
      score += 6;
    }
  }

  // Normalize to 0-100
  if (maxScore === 0) return 0;
  return Math.round((score / maxScore) * 100);
}

function getMatchReasons(deal, userBuyBox) {
  const reasons = [];

  // Check deal type
  if (userBuyBox.buyingStrategies) {
    const strategies = Array.isArray(userBuyBox.buyingStrategies)
      ? userBuyBox.buyingStrategies
      : userBuyBox.buyingStrategies.split(", ");

    if (strategies && strategies.includes(deal.dealType)) {
      reasons.push(`✅ Deal type matches (${deal.dealType})`);
    }
  }

  // Check state
  if (userBuyBox.preferredStates) {
    const states = Array.isArray(userBuyBox.preferredStates)
      ? userBuyBox.preferredStates
      : userBuyBox.preferredStates.split(", ");

    if (states && states.includes(deal.state)) {
      reasons.push(`✅ Located in ${deal.state} (preferred state)`);
    }
  }

  // Check city
  if (userBuyBox.preferredCities) {
    const cities = Array.isArray(userBuyBox.preferredCities)
      ? userBuyBox.preferredCities
      : userBuyBox.preferredCities.split(", ");

    if (cities && cities.includes(deal.city)) {
      reasons.push(`✅ Located in ${deal.city} (preferred city)`);
    }
  }

  // Check entry fee
  if (userBuyBox.entryFeeMax && deal.entryFee) {
    if (deal.entryFee <= userBuyBox.entryFeeMax) {
      reasons.push(
        `✅ Entry fee $${deal.entryFee.toLocaleString()} (within budget of $${userBuyBox.entryFeeMax.toLocaleString()})`
      );
    } else if (deal.entryFee <= userBuyBox.entryFeeMax * 1.1) {
      reasons.push(
        `⚠️ Entry fee $${deal.entryFee.toLocaleString()} (slightly above budget of $${userBuyBox.entryFeeMax.toLocaleString()})`
      );
    }
  }

  // Check bedrooms
  if (userBuyBox.bedroomsMin && deal.bedCount) {
    if (parseInt(deal.bedCount) >= userBuyBox.bedroomsMin) {
      reasons.push(
        `✅ ${deal.bedCount} bedrooms (meets minimum of ${userBuyBox.bedroomsMin})`
      );
    }
  }

  // Check bathrooms
  if (userBuyBox.bathroomsMin && deal.bathCount) {
    if (parseInt(deal.bathCount) >= userBuyBox.bathroomsMin) {
      reasons.push(
        `✅ ${deal.bathCount} bathrooms (meets minimum of ${userBuyBox.bathroomsMin})`
      );
    }
  }

  // Check exit strategies
  if (deal.exitStrategies && deal.exitStrategies.length > 0) {
    const strategies = Array.isArray(userBuyBox.buyingStrategies)
      ? userBuyBox.buyingStrategies
      : userBuyBox.buyingStrategies ? userBuyBox.buyingStrategies.split(", ") : [];

    const matchingExit = deal.exitStrategies.filter(es =>
      strategies.includes(es)
    );

    if (matchingExit.length > 0) {
      reasons.push(`✅ Supports exit strategies: ${matchingExit.join(", ")}`);
    }
  }

  return reasons;
}

module.exports = { calculateMatchScore, getMatchReasons };
