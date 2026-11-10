const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createDealsCache } = require('../src/utils/dealsCache');
const tick = () => new Promise(resolve => setImmediate(resolve));

function fixture() {
  let time = 0;
  let calls = 0;
  let resolve, reject;
  const get = createDealsCache(() => {
    calls++;
    return new Promise((yes, no) => { resolve = yes; reject = no; });
  }, { now: () => time, onError: () => {} });
  return { get, setTime: value => { time = value; }, calls: () => calls,
    resolve: value => resolve(value), reject: error => reject(error) };
}

test('cold requests share a fetch, including an empty cached result', async () => {
  const f = fixture();
  const a = f.get(), b = f.get();
  await tick();
  assert.equal(f.calls(), 1);
  f.resolve([]);
  assert.deepEqual(await a, []);
  assert.deepEqual(await b, []);
  await f.get();
  assert.equal(f.calls(), 1);
});

test('refresh returns the snapshot immediately, deduplicates, then replaces it', async () => {
  const f = fixture();
  const initial = f.get(); await tick(); f.resolve(['old']); await initial;
  f.setTime(240000);
  assert.deepEqual(await f.get(), ['old']);
  assert.deepEqual(await f.get(), ['old']);
  assert.equal(f.calls(), 2);
  f.resolve(['new']); await tick();
  assert.deepEqual(await f.get(), ['new']);
});

test('hard expiry waits for the ongoing refresh instead of serving old deals', async () => {
  const f = fixture();
  const initial = f.get(); await tick(); f.resolve(['old']); await initial;
  f.setTime(240000); await f.get();
  f.setTime(300000);
  let settled = false;
  const pending = f.get().then(value => { settled = true; return value; });
  await tick(); assert.equal(settled, false);
  f.resolve(['new']);
  assert.deepEqual(await pending, ['new']);
  assert.equal(f.calls(), 2);
});

test('refresh failures back off and never extend the hard freshness limit', async () => {
  const f = fixture();
  const initial = f.get(); await tick(); f.resolve(['old']); await initial;
  f.setTime(290000); await f.get();
  f.reject(new Error('offline')); await tick();
  assert.deepEqual(await f.get(), ['old']);
  assert.equal(f.calls(), 2);
  f.setTime(300000); await assert.rejects(f.get(), /offline/);
  f.setTime(320000);
  const retry = f.get(); await tick(); f.resolve(['recovered']);
  assert.deepEqual(await retry, ['recovered']);
});
