import test from 'node:test';
import assert from 'node:assert/strict';
import { createInterfaceAudio, loadSoundPreference, saveSoundPreference } from '../src/app/lib/interface-audio.js';

function audioFixture() {
  const sounds = new Map();
  const getAudio = cue => {
    if (!sounds.has(cue)) sounds.set(cue, {
      paused: true, currentTime: 0, volume: 1, plays: 0,
      play() { this.paused = false; this.plays++; return Promise.resolve(); },
      pause() { this.paused = true; },
    });
    return sounds.get(cue);
  };
  return { getAudio, player: createInterfaceAudio(getAudio) };
}

test('navigation can play beneath startup, and launching a project ends startup', async () => {
  const { getAudio, player } = audioFixture();
  await player.play('startup');
  await player.play('option');
  assert.equal(getAudio('startup').paused, false);
  assert.equal(getAudio('option').paused, false);
  await player.play('launch');
  assert.equal(getAudio('startup').paused, true);
  assert.equal(getAudio('option').paused, true);
  assert.equal(getAudio('launch').paused, false);
});

test('closing a project interrupts its launch sound with cancel', async () => {
  const { getAudio, player } = audioFixture();
  await player.play('launch');
  await player.play('cancel');
  assert.equal(getAudio('launch').paused, true);
  assert.equal(getAudio('launch').currentTime, 0);
  assert.equal(getAudio('cancel').paused, false);
});

test('mute stops both channels and cancels a play promise that resolves later', async () => {
  const { getAudio, player } = audioFixture();
  let resolvePlay;
  const launch = getAudio('launch');
  launch.play = function () { this.paused = false; return new Promise(resolve => { resolvePlay = resolve; }); };
  const pending = player.play('launch');
  await player.play('startup');
  player.setEnabled(false);
  assert.equal(launch.paused, true);
  assert.equal(getAudio('startup').paused, true);
  resolvePlay();
  assert.equal(await pending, false);
  assert.equal(await player.play('option'), false);
  assert.equal(launch.paused, true);
});

test('a stale request cannot stop a newer play of the same sound', async () => {
  const { getAudio, player } = audioFixture();
  const resolvers = [];
  const option = getAudio('option');
  option.play = function () { this.paused = false; return new Promise(resolve => resolvers.push(resolve)); };
  const first = player.play('option');
  const second = player.play('option');
  resolvers[0]();
  assert.equal(await first, false);
  assert.equal(option.paused, false);
  resolvers[1]();
  assert.equal(await second, true);
});

test('autoplay rejection is handled and a subsequent interaction can play', async () => {
  const { getAudio, player } = audioFixture();
  const startup = getAudio('startup');
  startup.play = () => Promise.reject(new Error('NotAllowedError'));
  assert.equal(await player.play('startup'), false);
  startup.play = () => Promise.resolve();
  assert.equal(await player.play('startup'), true);
});

test('sound preferences survive a new visit and tolerate unavailable storage', () => {
  const values = new Map();
  const storage = () => ({ getItem: key => values.get(key), setItem: (key, value) => values.set(key, value) });
  assert.equal(loadSoundPreference(storage), true);
  saveSoundPreference(storage, false);
  assert.equal(loadSoundPreference(storage), false);
  saveSoundPreference(storage, true);
  assert.equal(loadSoundPreference(storage), true);
  const blocked = () => { throw new Error('Storage unavailable'); };
  assert.equal(loadSoundPreference(blocked), true);
  assert.doesNotThrow(() => saveSoundPreference(blocked, false));
});
