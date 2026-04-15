const USERS_TABLE = "Users";

const UserFields = {
  FIREBASE_UID: "firebaseUid",
  EMAIL: "email",
  NAME: "name",
  ROLE: "role",
  PHONE: "phone",
  COMPANY: "company",
};

const UserRoles = {
  INVESTOR: "investor",
  JV_PARTNER: "jv_partner",
  ADMIN: "admin",
  CONNECTOR: "connector",
  AFFILIATE: "affiliate",
  TRANSACTION_COORDINATOR: "transaction_coordinator",
};

function formatUser(record) {
  return {
    id: record.id,
    firebaseUid: record.fields[UserFields.FIREBASE_UID] || "",
    email: record.fields[UserFields.EMAIL] || "",
    name: record.fields[UserFields.NAME] || "",
    role: record.fields[UserFields.ROLE] || "",
    phone: record.fields[UserFields.PHONE] || "",
    company: record.fields[UserFields.COMPANY] || "",
  };
}

module.exports = { USERS_TABLE, UserFields, UserRoles, formatUser };