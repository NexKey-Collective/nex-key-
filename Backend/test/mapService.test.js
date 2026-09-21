const { test } = require('node:test');
const assert = require('node:assert/strict');
const { parseCsv, parseLocations, storedLocation } = require('../src/services/mapService');

test('parses Census CSV quoting and CRLF without splitting coordinate pairs', () => {
  assert.deepEqual(parseCsv('"id","street, city","a""b"\r\n'), [['id', 'street, city', 'a"b']]);
});
test('uses matched Census coordinates in correct latitude/longitude order', () => {
  const result = parseLocations('"one","address","Match","Exact","matched address","-96.8,32.7","1","L"\n"two","address","No_Match"\n');
  assert.deepEqual(result.get('one'), { latitude: 32.7, longitude: -96.8, accuracy: 'address', source: 'US Census' });
  assert.equal(result.get('two'), null);
});
test('rejects invalid or out-of-range geocoder coordinates', () => {
  assert.equal(parseLocations('"id","address","Match","Exact","matched","x,32"').size, 0);
  assert.equal(parseLocations('"id","address","Match","Exact","matched","-96,132"').size, 0);
});
test('does not turn missing stored coordinates into zero coordinates', () => {
  for (const value of [null, undefined, '']) assert.equal(storedLocation({ latitude: value, longitude: value }), null);
  assert.equal(storedLocation({ latitude: 91, longitude: 40 }), null);
  assert.deepEqual(storedLocation({ latitude: '32.7', longitude: '-96.8' }), { latitude: 32.7, longitude: -96.8, accuracy: 'stored', source: 'Listing' });
});
