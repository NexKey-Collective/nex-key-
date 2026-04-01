require('dotenv').config({ path: '../.env' });
const { AIRTABLE_TOKEN, BASE_ID } = process.env;

async function getFields() {
  // Get field types from metadata
  const metaRes = await fetch(
    `https://api.airtable.com/v0/meta/bases/${BASE_ID}/tables`,
    { headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` } }
  );
  const meta = await metaRes.json();
  const dealsTable = meta.tables.find(t => t.name === "Deals");
  const fieldTypeMap = Object.fromEntries(dealsTable.fields.map(f => [f.name, f.type]));

  // Get fields visible in "All deals" view
  const viewRes = await fetch(
    `https://api.airtable.com/v0/${BASE_ID}/Deals?view=All+deals&maxRecords=1`,
    { headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` } }
  );
  const viewData = await viewRes.json();
  const visibleFields = Object.keys(viewData.records[0].fields);

  visibleFields.forEach(name => console.log(`${name}: ${fieldTypeMap[name] || 'unknown'}`));
}

getFields();