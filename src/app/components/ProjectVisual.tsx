import { Server, HardDrive, ShieldCheck, ScanSearch, Check, Gamepad2 } from 'lucide-react';
import type { PortfolioEntry } from '../data/portfolio';
export function ProjectVisual({ type }: { type: PortfolioEntry['visual'] }) {
  if (!type) return null;
  return <div className={`project-visual visual-${type}`} aria-hidden="true"><div className="visual-grid" />
    {type === 'vault' && <><div className="server-unit"><span className="server-top"><Server size={22} /><span>KENSHIVAULT</span></span>{[0, 1, 2].map(i => <div className="server-bay" key={i}><HardDrive size={17} /><span /><i /></div>)}</div><div className="service-stack"><span><i />Jellyfin</span><span><i />Immich</span><span><i />Retrom</span><small><ShieldCheck size={12} /> Connected through Tailscale</small></div></>}
    {type === 'factlens' && <><div className="lens-orbit"><ScanSearch size={48} strokeWidth={1} /></div><div className="fact-lines"><small>FACTLENS / ANALYSIS WORKFLOW</small><span /><span /><span /><div><Check size={13} /> Examine. Analyze. Verify.</div></div></>}
    {type === 'forecast' && <><span className="chart-label">ENSEMBLE / TREND ANALYSIS</span><svg className="forecast-chart" viewBox="0 0 500 140"><path d="M0 115 35 90 68 103 99 75 130 80 160 55 195 70 230 35 260 50 295 27 325 40 360 15" fill="none" stroke="var(--accent)" strokeWidth="2" /><path d="m360 15 35 20 30-20 35 8 40-15" fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="5 5" /><path d="M360 15 395 50 425 30 460 50 500 32V0H360Z" fill="var(--accent)" opacity=".07" /></svg><span className="chart-foot">ARIMA · SARIMA · XGBoost · CatBoost · Ridge</span></>}
    {type === 'portfolio' && <><div className="mini-xmb"><Gamepad2 size={48} strokeWidth={1} /><div><span /> <span /> <span /> <span /></div></div><div className="portfolio-art-word">aoxo<span>PERSONAL SYSTEM / 01</span></div></>}
  </div>;
}
