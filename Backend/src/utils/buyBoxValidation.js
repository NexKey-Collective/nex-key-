function validateBuyBoxInput(data) {
  const errors = [];

  // Validate buying strategies if provided
  if (data.buyingStrategies !== undefined) {
    if (typeof data.buyingStrategies !== "string" && !Array.isArray(data.buyingStrategies)) {
      errors.push("buyingStrategies must be a string or array");
    }
  }

  // Validate exit strategies if provided
  if (data.exitStrategies !== undefined) {
    if (typeof data.exitStrategies !== "string" && !Array.isArray(data.exitStrategies)) {
      errors.push("exitStrategies must be a string or array");
    }
  }

  // Validate preferred states
  if (data.preferredStates !== undefined) {
    if (typeof data.preferredStates !== "string" && !Array.isArray(data.preferredStates)) {
      errors.push("preferredStates must be a string or array");
    }
  }

  // Validate preferred cities
  if (data.preferredCities !== undefined) {
    if (typeof data.preferredCities !== "string" && !Array.isArray(data.preferredCities)) {
      errors.push("preferredCities must be a string or array");
    }
  }

  // Validate interested deal type if provided
  if (data.interestedDealType !== undefined) {
    if (typeof data.interestedDealType !== "string" && !Array.isArray(data.interestedDealType)) {
      errors.push("interestedDealType must be a string or array");
    }
  }

  // Validate max entry fee if provided
  if (data.entryFeeMax !== undefined && data.entryFeeMax !== null) {
    if (typeof data.entryFeeMax !== "number" || data.entryFeeMax < 0) {
      errors.push("entryFeeMax must be a positive number or null");
    }
  }

  // Validate purchase price max if provided
  if (data.purchasePriceMax !== undefined && data.purchasePriceMax !== null) {
    if (typeof data.purchasePriceMax !== "number" || data.purchasePriceMax < 0) {
      errors.push("purchasePriceMax must be a positive number or null");
    }
  }

  // Validate bedrooms min if provided
  if (data.bedroomsMin !== undefined && data.bedroomsMin !== null) {
    if (typeof data.bedroomsMin !== "number" || data.bedroomsMin < 0) {
      errors.push("bedroomsMin must be a positive number or null");
    }
  }

  // Validate bathrooms min if provided
  if (data.bathroomsMin !== undefined && data.bathroomsMin !== null) {
    if (typeof data.bathroomsMin !== "number" || data.bathroomsMin < 0) {
      errors.push("bathroomsMin must be a positive number or null");
    }
  }

  // Validate email if provided
  if (data.email !== undefined && data.email !== null) {
    if (typeof data.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push("Invalid email format");
    }
  }

  // Validate first name if provided
  if (data.firstName !== undefined && data.firstName !== null) {
    if (typeof data.firstName !== "string") {
      errors.push("firstName must be a string");
    }
  }

  // Validate last name if provided
  if (data.lastName !== undefined && data.lastName !== null) {
    if (typeof data.lastName !== "string") {
      errors.push("lastName must be a string");
    }
  }

  return { isValid: errors.length === 0, errors };
}

module.exports = { validateBuyBoxInput };
