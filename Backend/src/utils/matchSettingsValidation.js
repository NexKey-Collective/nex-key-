const { DEFAULT_WEIGHTS } = require("../services/matchingService");

const ALLOWED_WEIGHT_KEYS = Object.keys(DEFAULT_WEIGHTS);
const ALLOWED_TOP_LEVEL_KEYS = ["weights", "zipCode", "radiusMiles"];

function validateMatchSettingsInput(data) {
  const errors = [];

  for (const key of Object.keys(data)) {
    if (!ALLOWED_TOP_LEVEL_KEYS.includes(key)) {
      errors.push(`Unknown field: ${key}`);
    }
  }

  if (data.weights !== undefined && data.weights !== null) {
    if (typeof data.weights !== "object" || Array.isArray(data.weights)) {
      errors.push("weights must be an object");
    } else {
      for (const [key, value] of Object.entries(data.weights)) {
        if (!ALLOWED_WEIGHT_KEYS.includes(key)) {
          errors.push(`Unknown weight key: ${key}`);
          continue;
        }
        if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
          errors.push(`weights.${key} must be a non-negative number`);
        }
      }
    }
  }

  if (data.zipCode !== undefined && data.zipCode !== null) {
    if (typeof data.zipCode !== "string" || !/^\d{5}$/.test(data.zipCode)) {
      errors.push("zipCode must be a 5-digit string");
    }
  }

  if (data.radiusMiles !== undefined && data.radiusMiles !== null) {
    if (typeof data.radiusMiles !== "number" || !Number.isFinite(data.radiusMiles) || data.radiusMiles <= 0) {
      errors.push("radiusMiles must be a positive number");
    }
  }

  return { isValid: errors.length === 0, errors };
}

module.exports = { validateMatchSettingsInput, ALLOWED_WEIGHT_KEYS };
