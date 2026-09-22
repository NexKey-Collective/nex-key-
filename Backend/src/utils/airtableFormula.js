// Airtable formula strings use single-quoted literals with backslash escapes.
// Values interpolated into filterByFormula without this are a formula-injection
// vector: e.g. an email of  x') , TRUE(), ({Email}='x  breaks out of the
// intended `{Email} = '...'` comparison. Escape backslashes first so an
// escaped quote isn't later re-escaped.
function escapeFormulaValue(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

module.exports = { escapeFormulaValue };
