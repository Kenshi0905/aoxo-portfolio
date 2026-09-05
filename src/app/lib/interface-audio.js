export const SOUND_KEY = 'aoxo.sound';
export const soundFiles = {
  startup: 'coldboot_stereo.wav',
  launch: 'gameboot_stereo.wav',
  option: 'snd_option.wav',
  confirm: 'snd_system_ok.wav',
  cancel: 'snd_cancel.wav',
  error: 'snd_error.wav',
  denied: 'snd_system_ng.wav',
  trophy: 'snd_trophy.wav',
};

export function loadSoundPreference(getStorage) {
  try { return getStorage().getItem(SOUND_KEY) !== 'off'; }
  catch { return true; }
}

export function saveSoundPreference(getStorage, enabled) {
  try { getStorage().setItem(SOUND_KEY, enabled ? 'on' : 'off'); }
  catch { /* The toggle still works when browser storage is unavailable. */ }
}

// Two channels let the startup tail continue under quiet navigation sounds.
// Replacing an effect cancels its pending play request as well as its audio.
export function createInterfaceAudio(getAudio, initiallyEnabled = true) {
  let enabled = initiallyEnabled;
  const channels = new Map();
  const stopChannel = channel => {
    const current = channels.get(channel);
    channels.delete(channel);
    if (current) {
      current.audio.pause();
      current.audio.currentTime = 0;
    }
  };
  const stop = () => {
    stopChannel('startup');
    stopChannel('effect');
  };

  return {
    stop,
    setEnabled(value) {
      enabled = value;
      if (!enabled) stop();
    },
    async play(cue) {
      if (!enabled || !soundFiles[cue]) return false;
      const audio = getAudio(cue);
      if (!audio) return false;
      const channel = cue === 'startup' ? 'startup' : 'effect';
      stopChannel(channel);
      if (cue === 'launch') stopChannel('startup');
      const request = { audio };
      channels.set(channel, request);
      audio.volume = cue === 'startup' || cue === 'launch' ? 0.4 : 0.56;
      audio.currentTime = 0;
      try {
        await audio.play();
        if (!enabled || channels.get(channel) !== request) {
          // A later request may be using this same element; do not stop it.
          if (channels.get(channel)?.audio !== audio) audio.pause();
          return false;
        }
        return true;
      } catch {
        if (channels.get(channel) === request) channels.delete(channel);
        // Autoplay can be blocked until a visitor interacts with the page.
        return false;
      }
    },
  };
}
