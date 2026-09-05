import * as Dialog from '@radix-ui/react-dialog';
import type { PortfolioEntry } from '../data/portfolio';

export function PlayerProfile({ entry }: { entry: PortfolioEntry }) {
  if (!entry.profile) return null;

  return <div className="player-profile">
    <figure className="player-portrait">
      <div className="portrait-frame"><img src={entry.profile.photo} alt={entry.profile.name} width={1040} height={999} decoding="async" /></div>
      <figcaption><span className="player-indicator" aria-hidden="true" />Player 01<span className="player-handle">aoxo.</span></figcaption>
    </figure>
    <div className="player-introduction">
      <p className="player-label">{entry.label}</p>
      <Dialog.Title className="dialog-title">{entry.profile.name}</Dialog.Title>
      <p className="player-role">{entry.profile.role}</p>
      <Dialog.Description className="dialog-description">{entry.description}</Dialog.Description>
      <div className="tags">{entry.tags?.map(tag => <span key={tag}>{tag}</span>)}</div>
    </div>
  </div>;
}
