import { test } from 'node:test';
import assert from 'node:assert/strict';
import { matchesLocation } from '../src/utils/locationSearch.js';
const dallas={city:'Dallas, TX',state:'TX',zipCode:'75208-1234',metroArea:'Dallas–Fort Worth',address:'102 Main Street',fullAddress:'102 Main Street, Dallas, TX 75208'};
test('ZIP, ZIP+4, city, metro area and state aliases match',()=>{
  for(const query of ['75208','75208-1234','Dallas','dallas tx','Dallas, Texas 75208','Texas','TX','Fort Worth',' DALLAS–FORT WORTH ','fort']) assert.equal(matchesLocation(dallas,query),true,query);
});
test('other ZIPs, cities and states do not match',()=>{
  for(const query of ['75209','Austin','CA','California','IN','Dallas California','75208-9999']) assert.equal(matchesLocation(dallas,query),false,query);
});
test('supports full state names, multiple words, accents and missing fields',()=>{
  const deal={city:'Santa Fé',state:'New Mexico',zipCode:'87501'};
  for(const query of ['NM','New Mexico','Santa Fe NM','87501']) assert.equal(matchesLocation(deal,query),true,query);
  assert.equal(matchesLocation({},'  '),true);
  assert.equal(matchesLocation({},'Texas'),false);
  assert.equal(matchesLocation({city:'Irving',state:'TX'},'IN'),false);
});
