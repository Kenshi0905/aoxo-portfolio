import { useCallback, useEffect, useRef, useState } from 'react';
import { createInterfaceAudio, loadSoundPreference, saveSoundPreference, soundFiles } from '../lib/interface-audio';

export type InterfaceSound = keyof typeof soundFiles;

export function useInterfaceSound(startupActive: boolean) {
  const [enabled, setEnabled] = useState(() => loadSoundPreference(() => window.localStorage));
  const enabledRef = useRef(enabled);
  const elements = useRef(new Map<InterfaceSound, HTMLAudioElement>());
  const controller = useRef<ReturnType<typeof createInterfaceAudio> | null>(null);
  controller.current ??= createInterfaceAudio((cue: InterfaceSound) => elements.current.get(cue), enabled);
  const startupStarted = useRef(false);

  const register = useCallback((cue: InterfaceSound, element: HTMLAudioElement | null) => {
    if (element) elements.current.set(cue, element);
    else elements.current.delete(cue);
  }, []);
  const play = useCallback((cue: InterfaceSound = 'option') => {
    void controller.current?.play(cue);
  }, []);
  const toggle = useCallback(() => {
    const next = !enabledRef.current;
    enabledRef.current = next;
    controller.current?.setEnabled(next);
    setEnabled(next);
    saveSoundPreference(() => window.localStorage, next);
    if (next) play('confirm');
  }, [play]);

  useEffect(() => {
    if (!enabled || !startupActive) return;
    let cancelled = false;
    const start = () => {
      if (cancelled || startupStarted.current || !enabledRef.current) return;
      startupStarted.current = true;
      void controller.current?.play('startup').then(started => {
        if (!started) startupStarted.current = false;
      });
    };
    start();
    // Only retry while the introduction is visible, never after entering a menu.
    window.addEventListener('pointerdown', start);
    window.addEventListener('keydown', start);
    return () => {
      cancelled = true;
      window.removeEventListener('pointerdown', start);
      window.removeEventListener('keydown', start);
    };
  }, [enabled, startupActive]);

  useEffect(() => {
    const stop = () => {
      controller.current?.stop();
      startupStarted.current = false;
    };
    const onVisibilityChange = () => { if (document.hidden) stop(); };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return { enabled, toggle, play, register };
}
