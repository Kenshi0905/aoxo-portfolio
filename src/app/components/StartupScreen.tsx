import { PSButton } from './PSButton';

export function StartupScreen({ onSkip }: { onSkip: () => void }) {
  return <section className="startup-screen" aria-label="Welcome to Ashmit’s Portfolio">
    <h2 className="startup-title">Welcome to <span>Ashmit’s Portfolio</span></h2>
    <button className="startup-skip" onClick={onSkip} aria-label="Skip introduction"><PSButton shape="cross" /><span>Skip intro</span><kbd>Enter</kbd></button>
  </section>;
}
