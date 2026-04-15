const BUYBOX_TABLE = "BuyBox";

const BuyBoxFields = {
  EMAIL: "email",
  FIRST_NAME: "firstName",
  LAST_NAME: "lastName",
  GHL_CONTACT_ID: "ghlContactId",
  PREFERRED_STATES: "preferredStates",
  PREFERRED_CITIES: "preferredCities",
  BUYING_STRATEGIES: "buyingStrategies",
  INTERESTED_DEAL_TYPE: "interestedDealType",
  PURCHASE_PRICE_MAX: "purchasePriceMax",
  ENTRY_FEE_MAX: "entryFeeMax",
  BEDROOMS_MIN: "bedroomsMin",
  BATHROOMS_MIN: "bathroomsMin",
  BUY_BOX_STATUS: "buyBoxStatus",
  BUYER_STATUS: "buyerStatus",
  CONTACT_SOURCE: "contactSource",
  SUBMITTED_AT: "submittedAt",
  USER_ID: "userId",
};

function formatBuyBox(record) {
  return {
    id: record.id,
    email: record.fields[BuyBoxFields.EMAIL] || "",
    firstName: record.fields[BuyBoxFields.FIRST_NAME] || "",
    lastName: record.fields[BuyBoxFields.LAST_NAME] || "",
    ghlContactId: record.fields[BuyBoxFields.GHL_CONTACT_ID] || "",
    preferredStates: record.fields[BuyBoxFields.PREFERRED_STATES] || "",
    preferredCities: record.fields[BuyBoxFields.PREFERRED_CITIES] || "",
    buyingStrategies: record.fields[BuyBoxFields.BUYING_STRATEGIES] || "",
    interestedDealType: record.fields[BuyBoxFields.INTERESTED_DEAL_TYPE] || "",
    purchasePriceMax: record.fields[BuyBoxFields.PURCHASE_PRICE_MAX] || null,
    entryFeeMax: record.fields[BuyBoxFields.ENTRY_FEE_MAX] || null,
    bedroomsMin: record.fields[BuyBoxFields.BEDROOMS_MIN] || null,
    bathroomsMin: record.fields[BuyBoxFields.BATHROOMS_MIN] || null,
    buyBoxStatus: record.fields[BuyBoxFields.BUY_BOX_STATUS] || "",
    buyerStatus: record.fields[BuyBoxFields.BUYER_STATUS] || "",
    contactSource: record.fields[BuyBoxFields.CONTACT_SOURCE] || "",
    submittedAt: record.fields[BuyBoxFields.SUBMITTED_AT] || "",
    userId: record.fields[BuyBoxFields.USER_ID] || "",
  };
}

// Maps GHL webhook payload to clean fields for Airtable
function mapGhlPayload(payload) {
  const fields = {
    [BuyBoxFields.EMAIL]: payload.email || "",
    [BuyBoxFields.FIRST_NAME]: payload.first_name || "",
    [BuyBoxFields.LAST_NAME]: payload.last_name || "",
    [BuyBoxFields.GHL_CONTACT_ID]: payload.contact_id || "",
    [BuyBoxFields.PREFERRED_STATES]: Array.isArray(payload["Preferred States"])
      ? payload["Preferred States"].join(", ")
      : payload["Preferred States"] || "",
    [BuyBoxFields.PREFERRED_CITIES]: Array.isArray(payload["Preferred Cities"])
      ? payload["Preferred Cities"].join(", ")
      : payload["Preferred Cities"] || "",
    [BuyBoxFields.BUYING_STRATEGIES]: Array.isArray(payload["Buying Strategies"])
      ? payload["Buying Strategies"].join(", ")
      : payload["Buying Strategies"] || "",
    [BuyBoxFields.PURCHASE_PRICE_MAX]: parseFloat(payload["Purchase Price (Max)"]) || null,
    [BuyBoxFields.ENTRY_FEE_MAX]: parseFloat(payload["Entry Fee (Max)"]) || null,
    [BuyBoxFields.BEDROOMS_MIN]: parseInt(payload["Bedrooms (Min)"], 10) || null,
    [BuyBoxFields.BATHROOMS_MIN]: parseInt(payload["Bathrooms (Min)"], 10) || null,
    [BuyBoxFields.CONTACT_SOURCE]: payload.contact_source || "",
    [BuyBoxFields.SUBMITTED_AT]: payload["Buy Box Submitted At "] || new Date().toISOString().split("T")[0],
  };

  // Only include single select fields if they have a value
  // Only include fields if they have a value
  if (payload["Interested Deal Type"]) {
    fields[BuyBoxFields.INTERESTED_DEAL_TYPE] = Array.isArray(payload["Interested Deal Type"])
      ? payload["Interested Deal Type"].join(", ")
      : payload["Interested Deal Type"];
  }

  if (payload["Buy Box Status"]) {
    fields[BuyBoxFields.BUY_BOX_STATUS] = payload["Buy Box Status"];
  }

  if (payload["Buyer Status"]) {
    fields[BuyBoxFields.BUYER_STATUS] = payload["Buyer Status"];
  }

  return fields;
}

module.exports = { BUYBOX_TABLE, BuyBoxFields, formatBuyBox, mapGhlPayload };