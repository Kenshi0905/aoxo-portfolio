import { soundFiles } from '../lib/interface-audio';
import type { InterfaceSound } from '../hooks/useInterfaceSound';

export function InterfaceSounds({ register }: { register: (cue: InterfaceSound, element: HTMLAudioElement | null) => void }) {
  return <div hidden aria-hidden="true">{Object.entries(soundFiles).map(([cue, file]) =>
    <audio key={cue} data-interface-sound={cue} ref={element => register(cue as InterfaceSound, element)} src={`/audio/ps3/${file}`} preload="auto" />,
  )}</div>;
}
