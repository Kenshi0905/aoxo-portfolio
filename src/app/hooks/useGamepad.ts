import { useEffect, useRef, useState } from 'react';
type Actions = { left: () => void; right: () => void; up: () => void; down: () => void; confirm: () => void; back: () => void; sound: () => void; theme: () => void; modalOpen: boolean; startup?: () => void };
export function useGamepad(actions: Actions) {
  const [connected, setConnected] = useState(false);
  const current = useRef(actions); current.current = actions;
  useEffect(() => {
    let frame = 0; let previousDirection = ''; let repeatAt = 0; let pressed = new Set<number>();
    const sync = () => setConnected(Array.from(navigator.getGamepads?.() ?? []).some(p => p?.mapping === 'standard'));
    window.addEventListener('gamepadconnected', sync); window.addEventListener('gamepaddisconnected', sync); sync();
    const poll = (now: number) => {
      const pad = Array.from(navigator.getGamepads?.() ?? []).find(p => p?.mapping === 'standard');
      if (pad && document.visibilityState === 'visible') {
        const a = current.current;
        const direction = pad.buttons[14]?.pressed || pad.axes[0] < -.6 ? 'left' : pad.buttons[15]?.pressed || pad.axes[0] > .6 ? 'right' : pad.buttons[12]?.pressed || pad.axes[1] < -.6 ? 'up' : pad.buttons[13]?.pressed || pad.axes[1] > .6 ? 'down' : '';
        if (direction && !a.modalOpen && !a.startup && (direction !== previousDirection || now > repeatAt)) { a[direction](); repeatAt = now + (direction !== previousDirection ? 400 : 180); }
        previousDirection = direction;
        pad.buttons.forEach((button, i) => { if (button.pressed && !pressed.has(i)) { if (a.startup) { if (i === 0 || i === 1) a.startup(); if (i === 2) a.sound(); return; } if (i === 0 && !a.modalOpen) a.confirm(); if (i === 1) a.back(); if (i === 2) a.sound(); if (i === 3) a.theme(); } });
        pressed = new Set(pad.buttons.flatMap((b, i) => b.pressed ? [i] : []));
      } else { pressed.clear(); previousDirection = ''; }
      frame = requestAnimationFrame(poll);
    };
    frame = requestAnimationFrame(poll);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('gamepadconnected', sync); window.removeEventListener('gamepaddisconnected', sync); };
  }, []);
  return connected;
}
