import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowUpRight, Gamepad2, Download, X, Move } from 'lucide-react';
import { RibbonBackground } from './components/RibbonBackground';
import { StartupScreen } from './components/StartupScreen';
import { InterfaceSounds } from './components/InterfaceSounds';
import { PSButton } from './components/PSButton';
import { GameDetails, gameModes } from './components/GameDetails';
import { OrganizationLogo } from './components/OrganizationLogo';
import { useInterfaceSound } from './hooks/useInterfaceSound';
import { useGamepad } from './hooks/useGamepad';
import { useStartup } from './hooks/useStartup';
import { useTheme } from './hooks/useTheme';
import { themes } from './lib/theme-preference';
import { categories, RESUME_URL, GITHUB_URL, type PortfolioEntry } from './data/portfolio';

const themeLabels = ['Midnight blue', 'Classic black', 'Amethyst'];

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => { const timer = window.setInterval(() => setNow(new Date()), 15000); return () => clearInterval(timer); }, []);
  return { time: now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }), date: now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', timeZone: 'Asia/Kolkata' }) };
}

function EntryAction({ entry }: { entry: PortfolioEntry }) {
  if (!entry.action) return null;
  const external = entry.action.href.startsWith('https:');
  return <a className="action-link" href={entry.action.href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} download={entry.action.download ? 'Ashmit-Avash-Resume.pdf' : undefined}>{entry.action.download && <Download size={16} />}{entry.action.label}<ArrowUpRight size={16} /></a>;
}

export default function App() {
  const { phase: startupPhase, active: startupActive, skip: skipStartup } = useStartup();
  const [activeCategory, setActiveCategory] = useState(0);
  const [selections, setSelections] = useState<Record<string, number>>({});
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [theme, setTheme] = useTheme();
  const returnFocus = useRef<HTMLElement | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const { enabled: soundEnabled, toggle: toggleSound, play, register: registerSound } = useInterfaceSound(startupActive);
  const { time, date } = useClock();
  const category = categories[activeCategory];
  const selectedIndex = selections[category.id] ?? 0;
  const entry = category.entries[selectedIndex];
  const modalOpen = detailsOpen || helpOpen;
  const selectCategory = useCallback((index: number, withSound = true) => { setActiveCategory((index + categories.length) % categories.length); if (withSound) play('option'); }, [play]);
  const selectEntry = useCallback((index: number, withSound = true) => {
    const next = Math.max(0, Math.min(index, category.entries.length - 1));
    setSelections(current => ({ ...current, [category.id]: next }));
    if (withSound) play(next !== index ? 'denied' : 'option');
  }, [category, play]);
  const openDetails = useCallback((target: PortfolioEntry = entry) => {
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setDetailsOpen(true);
    play(target.id === 'milestones' ? 'trophy' : category.id === 'projects' ? 'launch' : 'confirm');
  }, [entry, category.id, play]);
  const changeDetailsOpen = useCallback((open: boolean) => { setDetailsOpen(open); if (!open && detailsOpen) play('cancel'); }, [detailsOpen, play]);
  const changeHelpOpen = useCallback((open: boolean) => { setHelpOpen(open); if (!open && helpOpen) play('cancel'); }, [helpOpen, play]);
  const openHelp = useCallback(() => { returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null; setHelpOpen(true); play('option'); }, [play]);
  const back = useCallback(() => {
    if (helpOpen) changeHelpOpen(false);
    else if (detailsOpen) changeDetailsOpen(false);
    else { if (selectedIndex !== 0) selectEntry(0, false); else selectCategory(0, false); play('cancel'); }
  }, [detailsOpen, helpOpen, selectedIndex, selectCategory, selectEntry, changeHelpOpen, changeDetailsOpen, play]);
  const changeTheme = useCallback(() => { setTheme(value => (value + 1) % themes.length); play('option'); }, [play]);
  const gamepadConnected = useGamepad({ left: () => selectCategory(activeCategory - 1), right: () => selectCategory(activeCategory + 1), up: () => selectEntry(selectedIndex - 1), down: () => selectEntry(selectedIndex + 1), confirm: () => openDetails(), back, sound: toggleSound, theme: changeTheme, modalOpen, startup: startupActive ? skipStartup : undefined });

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || (event.target instanceof HTMLElement && event.target.isContentEditable)) return;
      const key = event.key.toLowerCase();
      if (key === 's') { event.preventDefault(); if (!event.repeat) toggleSound(); return; }
      if (modalOpen) return;
      if (startupActive) {
        if (['enter', 'x', 'escape', 'o', ' '].includes(key)) { event.preventDefault(); if (!event.repeat) skipStartup(); }
        if (key.startsWith('arrow')) event.preventDefault();
        return;
      }
      if (event.repeat && ['enter', 'x'].includes(key)) return;
      if (['arrowleft', 'arrowright', 'arrowup', 'arrowdown', 'x', 'o', 'escape', 't', 's', '?'].includes(key)) event.preventDefault();
      if (key === 'arrowleft' || key === 'arrowright') {
        const next = (activeCategory + (key === 'arrowleft' ? -1 : 1) + categories.length) % categories.length;
        selectCategory(next);
        if (event.target instanceof HTMLElement && event.target.closest('[role="tab"]')) document.getElementById(`category-${categories[next].id}`)?.focus();
      }
      if (key === 'arrowup' || key === 'arrowdown') {
        const next = Math.max(0, Math.min(selectedIndex + (key === 'arrowup' ? -1 : 1), category.entries.length - 1));
        selectEntry(selectedIndex + (key === 'arrowup' ? -1 : 1));
        if (event.target instanceof HTMLElement && event.target.closest('.entry')) document.getElementById(`entry-${category.id}-${next}`)?.focus();
      }
      if (key === 'x') openDetails();
      if (key === 'enter' && (!(event.target instanceof HTMLElement && event.target.closest('button, a')) || (event.target instanceof HTMLElement && event.target.closest('[role="tab"]')))) { event.preventDefault(); openDetails(); }
      if (key === 'escape' || key === 'o') back();
      if (key === 't') changeTheme();
      if (key === '?') openHelp();
    };
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
  }, [activeCategory, selectedIndex, modalOpen, startupActive, skipStartup, selectCategory, selectEntry, openDetails, openHelp, back, changeTheme, toggleSound]);
  const restoreFocus = (event: Event) => { event.preventDefault(); returnFocus.current?.focus(); };

  return <div className={`portfolio theme-${themes[theme]} startup-${startupPhase}`}>
    <InterfaceSounds register={registerSound} />
    <RibbonBackground />
    <header className="system-header">
      <div className="identity header-info" aria-hidden={startupActive || undefined}><h1>Ashmit Avash</h1></div>
      <button className="brand" disabled={startupActive} onClick={() => { selectCategory(0); setSelections({}); }} aria-label="aoxo home"><span className="brand-word">aoxo<span className="brand-dot">.</span></span></button>
      <div className="system-status header-info" aria-hidden={startupActive || undefined}>{gamepadConnected && <Gamepad2 size={16} aria-label="Controller connected" />}<time>{date}<span>{time}</span></time><span className="timezone">IST</span></div>
    </header>

    <div className="portfolio-interface" aria-hidden={startupActive || undefined} {...(startupActive ? { inert: '' } : {})}>
    <a className="skip-link" href="#portfolio-content">Skip to portfolio content</a>
    <main className="system-main" id="portfolio-content" tabIndex={-1} onTouchStart={event => { touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }} onTouchEnd={event => { if (!touchStart.current || modalOpen) return; const dx = event.changedTouches[0].clientX - touchStart.current.x; const dy = event.changedTouches[0].clientY - touchStart.current.y; if (Math.abs(dx) > 75 && Math.abs(dx) > Math.abs(dy) * 1.5) selectCategory(activeCategory + (dx < 0 ? 1 : -1)); else if (Math.abs(dy) > 60 && Math.abs(dy) > Math.abs(dx) * 1.5) selectEntry(selectedIndex + (dy < 0 ? 1 : -1)); touchStart.current = null; }}>
      <section className="xmb" aria-label="Portfolio explorer">
        <div className="category-rail"><div className="category-track" role="tablist" aria-label="Portfolio categories">
          {categories.map((cat, i) => { const Icon = cat.icon; const selected = i === activeCategory; const slot = (i - activeCategory + categories.length) % categories.length;
            return <button key={cat.id} id={`category-${cat.id}`} role="tab" aria-label={cat.label} aria-selected={selected} aria-controls="category-panel" tabIndex={selected ? 0 : -1} className={`category ${selected ? 'is-active' : ''}`} style={{ '--slot': slot === 5 ? -1 : slot, '--mobile-slot': slot } as CSSProperties} onClick={() => selectCategory(i)}><span className="category-icon"><Icon strokeWidth={1.25} /></span><span className="category-label">{cat.label}</span></button>;
          })}
        </div></div>

        <div id="category-panel" role="tabpanel" aria-labelledby={`category-${category.id}`} className="explorer-body">
          <div className="entry-menu"><div className="entry-list" role="list" aria-label={`${category.label} entries`}>
            {category.entries.map((item, i) => { const Icon = item.icon; const distance = i - selectedIndex; const selected = distance === 0;
              return <div role="listitem" key={item.id} hidden={distance < -1 || distance > 3} className="entry-position" data-distance={distance} style={{ '--distance': distance, '--after-index': Math.max(0, distance - 1) } as CSSProperties}>
                <button id={`entry-${category.id}-${i}`} className={`entry ${selected ? 'is-selected' : ''}`} aria-label={item.label} aria-current={selected ? 'true' : undefined} onClick={() => selected ? openDetails(item) : selectEntry(i)} onKeyDown={event => { if (event.key === 'Enter') { event.preventDefault(); selectEntry(i, false); openDetails(item); } }}>
                  <span className="entry-icon">{item.organization ? <OrganizationLogo id={item.organization} decorative /> : <Icon strokeWidth={1.25} />}</span><span className="entry-label"><strong>{item.label}</strong>{selected && <small>{item.subtitle}</small>}</span>
                </button>
              </div>;
            })}
          </div></div>
        </div>
      </section>
    </main>

    <footer className="system-footer">
      <span className="navigation-note"><span>← →</span> categories <i>·</i><span className="item-navigation"><button aria-label="Previous item" disabled={selectedIndex === 0} onClick={() => selectEntry(selectedIndex - 1)}>↑</button><button aria-label="Next item" disabled={selectedIndex === category.entries.length - 1} onClick={() => selectEntry(selectedIndex + 1)}>↓</button></span> items{category.entries.length > 4 && <span className="navigation-count">{String(selectedIndex + 1).padStart(2, '0')} / {String(category.entries.length).padStart(2, '0')}</span>}</span>
      <div className="controller-hints"><button onClick={() => openDetails()}><PSButton shape="cross" /><span>Open</span><kbd>Enter</kbd></button><button onClick={back}><PSButton shape="circle" /><span>Back</span><kbd>Esc</kbd></button><button onClick={toggleSound} aria-pressed={soundEnabled} aria-label={`Sound ${soundEnabled ? 'on' : 'off'}`}><PSButton shape="square" /><span>Sound {soundEnabled ? 'on' : 'off'}</span><kbd>S</kbd></button><button onClick={changeTheme} aria-label={`Change theme, current: ${themeLabels[theme]}`}><PSButton shape="triangle" /><span>Theme</span><kbd>T</kbd></button><button className="help-button" aria-label="How to navigate" onClick={openHelp}>?</button></div>
    </footer>
    <div className="sr-only" role="status" aria-live="polite">{category.label}. {entry.label}. Theme: {themeLabels[theme]}. Sound {soundEnabled ? 'on' : 'off'}.</div>
    </div>
    {startupActive && <StartupScreen onSkip={skipStartup} />}

    <Dialog.Root open={detailsOpen} onOpenChange={changeDetailsOpen}><Dialog.Portal><Dialog.Overlay className="dialog-overlay" /><Dialog.Content className={`detail-dialog game-dialog game-${category.id} ${entry.profile ? 'profile-dialog' : ''} theme-${themes[theme]}`} onCloseAutoFocus={restoreFocus} onEscapeKeyDown={event => event.stopPropagation()} onKeyDown={event => { if (event.key.toLowerCase() === 'o') { event.stopPropagation(); changeDetailsOpen(false); } }} onClickCapture={event => { if (event.target instanceof Element && event.target.closest('a')) play('confirm'); }}>
      <div className="dialog-topline"><span className="dialog-context"><Gamepad2 size={16} strokeWidth={1.4} aria-hidden="true" /><span className="eyebrow">{gameModes[category.id]}</span></span><div className="dialog-window-controls"><span className="dialog-index">{String(selectedIndex + 1).padStart(2, '0')} / {String(category.entries.length).padStart(2, '0')}</span><Dialog.Close className="close-button" aria-label="Close details"><X size={17} /></Dialog.Close></div></div>
      <GameDetails entry={entry} category={category.id} />
      <div className="dialog-actions"><Dialog.Close className="quiet-link"><PSButton shape="circle" />Back to exploring<kbd>Esc</kbd></Dialog.Close><EntryAction entry={entry} />{entry.id === 'profile' && <a className="action-link" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">Find me on GitHub<ArrowUpRight size={14} /></a>}</div>
    </Dialog.Content></Dialog.Portal></Dialog.Root>

    <Dialog.Root open={helpOpen} onOpenChange={changeHelpOpen}><Dialog.Portal><Dialog.Overlay className="dialog-overlay" /><Dialog.Content className={`detail-dialog game-dialog game-help help-dialog theme-${themes[theme]}`} onCloseAutoFocus={restoreFocus} onEscapeKeyDown={event => event.stopPropagation()} onKeyDown={event => { if (event.key.toLowerCase() === 'o') { event.stopPropagation(); changeHelpOpen(false); } }} onClickCapture={event => { if (event.target instanceof Element && event.target.closest('a')) play('confirm'); }}>
      <div className="dialog-topline"><span className="eyebrow">A FAMILIAR WAY TO EXPLORE</span><Dialog.Close className="close-button" aria-label="Close navigation help"><X size={19} /></Dialog.Close></div><Gamepad2 className="help-icon" size={42} strokeWidth={1} /><Dialog.Title className="dialog-title">Make yourself at home.</Dialog.Title><Dialog.Description className="dialog-description">Use your keyboard, a mouse, touch, or a standard game controller. Every control at the bottom of the screen is clickable.</Dialog.Description>
      <div className="help-rows"><div><Move size={23} /><span>Move between categories and items</span><kbd>Arrow keys</kbd></div><div><PSButton shape="cross" /><span>Open the selected item</span><kbd>Enter / X</kbd></div><div><PSButton shape="circle" /><span>Close details or return to the start</span><kbd>Esc / O</kbd></div><div><PSButton shape="square" /><span>Toggle subtle interface sounds</span><kbd>S</kbd></div><div><PSButton shape="triangle" /><span>Change the background theme</span><kbd>T</kbd></div></div><p className="help-note">Click or tap an entry to select it, then tap it again to open. Swipe horizontally to change categories or vertically to move through items. The ↑ ↓ buttons also move through the list. On a controller, use the D-pad or left stick. Tab moves between links and buttons.</p><a href={RESUME_URL} download="Ashmit-Avash-Resume.pdf" className="action-link"><Download size={15} />Just here for the résumé? Download it here.</a>
    </Dialog.Content></Dialog.Portal></Dialog.Root>
  </div>;
}
