import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTheme, saveTheme, THEME_KEY, themes } from '../src/app/lib/theme-preference.js';

test('every theme survives a new visit using its stable name', () => {
  const values = new Map();
  const storage = () => ({ getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) });
  for (let index = 0; index < themes.length; index++) {
    saveTheme(storage, index);
    assert.equal(values.get(THEME_KEY), themes[index]);
    assert.equal(loadTheme(storage), index);
  }
});
test('missing, obsolete, and malformed preferences use Midnight', () => {
  for (const stored of [null, '', '2', 'unknown', '{broken']) assert.equal(loadTheme(() => ({ getItem: () => stored })), 0);
});
test('blocked access and failed storage operations do not break the interface', () => {
  const blocked = () => { throw new Error('SecurityError'); };
  assert.equal(loadTheme(blocked), 0);
  assert.doesNotThrow(() => saveTheme(blocked, 1));
  assert.equal(loadTheme(() => ({ getItem() { throw new Error('Read failed'); } })), 0);
  assert.doesNotThrow(() => saveTheme(() => ({ setItem() { throw new Error('Quota exceeded'); } }), 2));
});
test('an invalid theme cannot overwrite a saved preference', () => {
  let writes = 0;
  saveTheme(() => ({ setItem() { writes++; } }), 99);
  assert.equal(writes, 0);
});
