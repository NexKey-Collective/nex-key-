const fs = require('node:fs/promises');
const path = require('node:path');

const CACHE_FILE = path.resolve(__dirname, '../../.cache/map-locations.json');
const TTL = 30 * 24 * 60 * 60 * 1000;
let entries = {};
let job = null;
let lastError = null;
let retryAfter = 0;
const ready = fs.readFile(CACHE_FILE, 'utf8').then(text => { entries = JSON.parse(text); }).catch(() => {});

// Census CSV fields can contain quoted commas, newlines, and escaped quotes.
function parseCsv(text) {
  const rows = []; let row = [], value = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (quoted && text[i + 1] === '"') { value += '"'; i++; }
      else quoted = !quoted;
    } else if (!quoted && (c === ',' || c === '\n')) {
      row.push(value.replace(/\r$/, '')); value = '';
      if (c === '\n') { rows.push(row); row = []; }
    } else value += c;
  }
  if (value || row.length) { row.push(value.replace(/\r$/, '')); rows.push(row); }
  return rows;
}
const addressKey = deal => JSON.stringify([deal.address, deal.city, deal.state, deal.zipCode]);
const csvField = value => `"${String(value || '').replaceAll('"', '""')}"`;
function parseLocations(text) {
  const locations = new Map();
  for (const row of parseCsv(text)) {
    if (row[2] !== 'Match') { if (row[0]) locations.set(row[0], null); continue; }
    const [longitude, latitude] = (row[5] || '').split(',').map(Number);
    if (Number.isFinite(latitude) && Number.isFinite(longitude) && Math.abs(latitude) <= 90 && Math.abs(longitude) <= 180) {
      locations.set(row[0], { latitude, longitude, accuracy: 'address', source: 'US Census' });
    }
  }
  return locations;
}
async function geocode(deals) {
  for (let start = 0; start < deals.length; start += 100) {
    const batch = deals.slice(start, start + 100);
    const csv = batch.map(d => [d.id, d.address, d.city, d.state, d.zipCode].map(csvField).join(',')).join('\n');
    const form = new FormData();
    form.append('addressFile', new Blob([csv], { type: 'text/csv' }), 'addresses.csv');
    form.append('benchmark', 'Public_AR_Current');
    const response = await fetch('https://geocoding.geo.census.gov/geocoder/locations/addressbatch', {
      method: 'POST', body: form, signal: AbortSignal.timeout(120000),
    });
    if (!response.ok) throw new Error(`Geocoder returned ${response.status}`);
    const matches = parseLocations(await response.text());
    if (!matches.size) throw new Error('Geocoder returned an invalid response');
    for (const deal of batch) {
      if (matches.has(deal.id)) entries[deal.id] = { key: addressKey(deal), location: matches.get(deal.id), at: Date.now() };
    }
    await fs.mkdir(path.dirname(CACHE_FILE), { recursive: true });
    await fs.writeFile(`${CACHE_FILE}.tmp`, JSON.stringify(entries), { mode: 0o600 });
    await fs.rename(`${CACHE_FILE}.tmp`, CACHE_FILE);
  }
}
function storedLocation(deal) {
  if (deal.latitude == null || deal.longitude == null || deal.latitude === '' || deal.longitude === '') return null;
  const latitude = Number(deal.latitude), longitude = Number(deal.longitude);
  return Number.isFinite(latitude) && Number.isFinite(longitude) && Math.abs(latitude) <= 90 && Math.abs(longitude) <= 180
    ? { latitude, longitude, accuracy: 'stored', source: 'Listing' } : null;
}
async function getMapLocations() {
  await ready;
  const { getAllDeals } = require("./dealService");
  const deals = await getAllDeals();
  const pending = deals.filter(d => !storedLocation(d) && d.address && d.city && d.state && (!entries[d.id] || entries[d.id].key !== addressKey(d) || Date.now() - entries[d.id].at > TTL));
  if (process.env.CENSUS_GEOCODING_ENABLED === "true" && pending.length && !job && Date.now() >= retryAfter) {
    lastError = null;
    job = geocode(pending).catch(error => {
      console.error('Map geocoding failed:', error.message);
      lastError = 'Address lookup is temporarily unavailable. Please try again shortly.';
      retryAfter = Date.now() + 60000;
    }).finally(() => { job = null; });
  }
  const locations = {};
  for (const deal of deals) {
    const stored = storedLocation(deal);
    if (stored) { locations[deal.id] = stored; continue; }
    const entry = entries[deal.id];
    if (entry?.key === addressKey(deal) && entry.location) locations[deal.id] = entry.location;
  }
  return { locations, pending: Boolean(job), error: lastError, geocodingEnabled: process.env.CENSUS_GEOCODING_ENABLED === "true" };
}
module.exports = { getMapLocations, parseCsv, parseLocations, storedLocation };
