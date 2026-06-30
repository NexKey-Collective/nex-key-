const DEALS_TABLE = "Deals";

const DealFields = {
  ADDRESS: "Address",
  CITY: "City",
  STATE: "State",
  FULL_ADDRESS: "Full Address",
  DEAL_TYPE: "Deal Type",
  DEAL_STATUS: "Deal Status",
  INTAKE_STATUS: "Intake Status",
  ENTRY_FEE: "Entry Fee",
  ASSIGNMENT_FEE: "Assignment Fee",
  RATE_LOAN: "Rate (Loan)",
  PITI_LOAN: "PITI (Loan)",
  TOTAL_MONTHLY_PAYMENT: "Total Monthly Payment",
  BED_COUNT: "Bed Count",
  BATH_COUNT: "Bath Count",
  COE_DATE: "COE Date",
  FURNISHED: "Furnished",
  MULTI_UNIT: "Multi-unit",
  HAS_POOL: "Has Pool",
  HOA_RESTRICTIONS: "HOA Restrictions",
  LISTING_IMAGE_URL: "Listing Image URL",
  GOOGLE_DRIVE_STORAGE: "Google Drive Storage",
  ZIP_CODE: "Zip Code",
  METRO_AREA: "Metro Area",
  PUBLISH_TO_WEBSITE: "Publish to Website",
  DEAL_ADDED_DATE: "Deal Added Date",
  POSSIBLE_EXIT_STRATEGIES: "Possible Exit Strategies", // multi-select
  WEBSITE_TAGS: "Website Tags",
};

function formatDeal(record) {
  return {
    id: record.id,
    address: record.fields[DealFields.ADDRESS] || "",
    city: record.fields[DealFields.CITY] || "",
    state: record.fields[DealFields.STATE] || "",
    fullAddress: record.fields[DealFields.FULL_ADDRESS] || "",
    dealType: record.fields[DealFields.DEAL_TYPE] || "",
    dealStatus: record.fields[DealFields.DEAL_STATUS] || "",
    intakeStatus: record.fields[DealFields.INTAKE_STATUS] || "",
    entryFee: record.fields[DealFields.ENTRY_FEE] || null,
    assignmentFee: record.fields[DealFields.ASSIGNMENT_FEE] || null,
    rateLoan: record.fields[DealFields.RATE_LOAN] || null,
    pitiLoan: record.fields[DealFields.PITI_LOAN] || null,
    totalMonthlyPayment: record.fields[DealFields.TOTAL_MONTHLY_PAYMENT] || null,
    bedCount: record.fields[DealFields.BED_COUNT] || "",
    bathCount: record.fields[DealFields.BATH_COUNT] || "",
    coeDate: record.fields[DealFields.COE_DATE] || "",
    furnished: record.fields[DealFields.FURNISHED] || "",
    multiUnit: record.fields[DealFields.MULTI_UNIT] || "",
    hasPool: record.fields[DealFields.HAS_POOL] || "",
    hoaRestrictions: record.fields[DealFields.HOA_RESTRICTIONS] || "",
    listingImageUrl: Array.isArray(record.fields[DealFields.LISTING_IMAGE_URL])
      ? record.fields[DealFields.LISTING_IMAGE_URL][0]?.url || ""
      : record.fields[DealFields.LISTING_IMAGE_URL] || "",
    googleDriveStorage: record.fields[DealFields.GOOGLE_DRIVE_STORAGE] || "",
    zipCode: record.fields[DealFields.ZIP_CODE] || "",
    metroArea: record.fields[DealFields.METRO_AREA] || "",
    publishToWebsite: record.fields[DealFields.PUBLISH_TO_WEBSITE] || false,
    dealAddedDate: record.fields[DealFields.DEAL_ADDED_DATE] || "",
    exitStrategies: record.fields[DealFields.POSSIBLE_EXIT_STRATEGIES] || [], // array
    websiteTags: record.fields[DealFields.WEBSITE_TAGS] || [], // array
  };
}

module.exports = { DEALS_TABLE, DealFields, formatDeal };