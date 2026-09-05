import type { CSSProperties } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Github } from 'lucide-react';
import { PlayerProfile } from './PlayerProfile';
import { OrganizationLogo } from './OrganizationLogo';
import { ProjectVisual } from './ProjectVisual';
import { TechnologyIcon, hasTechnologyIcon } from './TechnologyIcon';
import type { PortfolioEntry } from '../data/portfolio';

export const gameModes: Record<string, string> = {
  about: 'Character', projects: 'Quest log', experience: 'Guild records', skills: 'Skill inventory', resume: 'Archive', contact: 'Message board',
};

export function GameDetails({ entry, category }: { entry: PortfolioEntry; category: string }) {
  return <>
    {entry.profile ? <PlayerProfile entry={entry} /> : <>
      <div className="game-heading">
        {entry.organization && <OrganizationLogo id={entry.organization} />}
        <div><p className="game-kicker">{entry.eyebrow}</p><Dialog.Title className="dialog-title">{entry.label}</Dialog.Title></div>
      </div>
      <Dialog.Description className="dialog-description">{entry.description}</Dialog.Description>
      {entry.collaborators?.length ? <p className="collaborator-credit"><span>Built with</span>{entry.collaborators.map(login => <a key={login} href={`https://github.com/${login}`} target="_blank" rel="noopener noreferrer"><Github size={13} aria-hidden="true" />@{login}</a>)}</p> : null}
      {category === 'skills' && <p className="inventory-caption">Equipped toolkit <span>{String(entry.tags?.length ?? 0).padStart(2, '0')} items</span></p>}
      <div className="tags">{entry.tags?.map(tag => <span key={tag} className={hasTechnologyIcon(tag) ? 'has-technology-icon' : undefined}><TechnologyIcon name={tag} /><span className="technology-label">{tag}</span></span>)}</div>
    </>}
    {entry.facts && <dl className="rpg-stats" style={{ '--stat-count': Math.min(3, entry.facts.length) } as CSSProperties}>
      {entry.facts.map(fact => <div className="stat-card" key={fact.label}>
        <dt>{fact.label}</dt><dd>{fact.value}</dd>
        {fact.score !== undefined && fact.max !== undefined && <div className="stat-meter" role="meter" aria-label={fact.label} aria-valuemin={0} aria-valuemax={fact.max} aria-valuenow={fact.score} aria-valuetext={`${fact.score} out of ${fact.max}`}><span style={{ width: `${Math.max(0, Math.min(100, fact.score / fact.max * 100))}%` }} /></div>}
      </div>)}
    </dl>}
    <ProjectVisual type={entry.visual} />
    <div className="detail-sections">{entry.sections.map((section, index) => <section key={section.title}>
      <div className="game-section-heading">
        {section.organizations ? <span className="section-logos">{section.organizations.map(id => <OrganizationLogo key={id} id={id} />)}</span> : <span className="quest-step" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>}
        <h3>{section.title}</h3>
      </div>
      {section.text && <p>{section.text}</p>}
      {section.points && <ul>{section.points.map(point => <li key={point}>{point}</li>)}</ul>}
    </section>)}</div>
  </>;
}
