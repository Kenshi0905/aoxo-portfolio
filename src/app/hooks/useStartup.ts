import { useCallback, useEffect, useRef, useState } from 'react';

export type StartupPhase = 'welcome' | 'reveal' | 'ready';

export function useStartup() {
  const [phase, setPhase] = useState<StartupPhase>(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'ready' : 'welcome',
  );
  const focusAfterSkip = useRef(false);
  const skip = useCallback(() => {
    focusAfterSkip.current = true;
    setPhase(current => current === 'welcome' ? 'reveal' : current);
  }, []);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => { if (preference.matches) setPhase('ready'); };
    preference.addEventListener('change', onChange);
    return () => preference.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (phase === 'ready') {
      if (focusAfterSkip.current) {
        document.getElementById('portfolio-content')?.focus({ preventScroll: true });
        focusAfterSkip.current = false;
      }
      return;
    }
    // Timers also complete the intro when animations are paused or unavailable.
    const timer = window.setTimeout(() => setPhase(phase === 'welcome' ? 'reveal' : 'ready'), phase === 'welcome' ? 4200 : 1200);
    return () => window.clearTimeout(timer);
  }, [phase]);

  return { phase, active: phase !== 'ready', skip };
}
