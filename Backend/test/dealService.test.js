const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const { createRequire } = require('node:module');
const path = require('node:path');

test('list query selects formatter fields and available deals; details remain unprojected', async () => {
  const file = path.resolve(__dirname, '../src/services/dealService.js');
  const actualRequire = createRequire(file);
  const { DealFields } = actualRequire('../models/Deal');
  let query, detailId;
  const record = { id: 'available', fields: { 'Deal Status': 'Available', Latitude: 32, Longitude: -96 } };
  const airtable = () => ({
    select(options) { query = options; return { all: async () => [record, { id: 'sold', fields: { 'Deal Status': 'Sold' } }] }; },
    find: async id => { detailId = id; return record; },
  });
  const context = { module: { exports: {} }, console,
    require: name => name === '../config/airtable' ? airtable : actualRequire(name) };
  vm.runInNewContext(fs.readFileSync(file, 'utf8'), context);
  const service = context.module.exports;
  const deals = await service.getAllDeals();
  assert.equal(query.filterByFormula, "{Deal Status} = 'Available'");
  assert.deepEqual(Array.from(query.fields), [...Object.values(DealFields), 'Latitude', 'Longitude']);
  assert.equal(deals.length, 1);
  assert.equal(deals[0].latitude, 32);
  await service.getDealById('detail');
  assert.equal(detailId, 'detail');
});
