const listFields = [
  "preferredStates",
  "preferredCities",
  "buyingStrategies",
  "interestedDealType",
];
const numberFields = [
  "purchasePriceMax",
  "entryFeeMax",
  "bedroomsMin",
  "bathroomsMin",
];
const textFields = ["firstName", "lastName"];
function validateBuyBoxInput(data) {
  const errors = [];
  if (!data || typeof data !== "object" || Array.isArray(data))
    return { isValid: false, errors: ["Body must be an object"] };
  for (const [key, value] of Object.entries(data)) {
    if (![...listFields, ...numberFields, ...textFields].includes(key)) {
      errors.push(`Unknown field: ${key}`);
      continue;
    }
    if (numberFields.includes(key)) {
      if (
        value !== null &&
        (typeof value !== "number" ||
          !Number.isFinite(value) ||
          value < 0 ||
          value > 1000000000)
      )
        errors.push(`${key} must be a non-negative finite number or null`);
    } else if (listFields.includes(key)) {
      if (!(
        (typeof value === "string" && value.length <= 2000) ||
        (Array.isArray(value) &&
          value.length <= 50 &&
          value.every((v) => typeof v === "string" && v.length <= 100))
      ))
        errors.push(`${key} must contain text values`);
    } else if (typeof value !== "string" || value.length > 100)
      errors.push(`${key} must be text up to 100 characters`);
  }
  return { isValid: errors.length === 0, errors };
}
module.exports = { validateBuyBoxInput };
