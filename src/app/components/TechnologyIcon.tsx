import { Activity, ChartLine, ChartNoAxesCombined, ChartScatter, CircuitBoard, Code2, Cpu, FolderSync, Layers3, Orbit, Server, Terminal, Timer, type LucideIcon } from 'lucide-react';

const logos: Record<string, { file: string; className?: string }> = {
  Python: { file: 'python.svg' }, Java: { file: 'java.svg' },
  'C++': { file: 'cplusplus.svg' }, C: { file: 'c.svg' },
  JavaScript: { file: 'javascript.svg' }, HTML: { file: 'html5.svg' }, CSS: { file: 'css3.svg' },
  React: { file: 'react.svg' }, TypeScript: { file: 'typescript.svg' }, Vite: { file: 'vitejs.svg' },
  'Three.js': { file: 'threejs.svg', className: 'technology-mono' },
  Docker: { file: 'docker.svg' }, Linux: { file: 'linux.svg' }, Git: { file: 'git.svg' },
  Tailscale: { file: 'tailscale.svg', className: 'technology-mono' },
  MySQL: { file: 'mysql.svg', className: 'technology-light' },
  XGBoost: { file: 'xgboost.png', className: 'technology-xgboost' },
  CatBoost: { file: 'catboost.png', className: 'technology-catboost' },
};

// Models, protocols, and concepts use descriptive symbols, not unrelated brands.
const symbols: Record<string, { icon: LucideIcon; color: string }> = {
  GLSL: { icon: Code2, color: '#a5c7ff' },
  'Terminal UI': { icon: Terminal, color: '#9bd7b4' },
  Simulation: { icon: Orbit, color: '#c9b0f6' },
  'Virtual machines': { icon: Layers3, color: '#a5c7ff' },
  SMB: { icon: FolderSync, color: '#e4c589' },
  'System monitoring': { icon: Activity, color: '#9bd7b4' },
  OpenMediaVault: { icon: Server, color: '#a5c7ff' },
  SARIMA: { icon: ChartNoAxesCombined, color: '#e4c589' },
  ARIMA: { icon: ChartLine, color: '#94d1cd' },
  'SARIMA / ARIMA': { icon: ChartNoAxesCombined, color: '#94d1cd' },
  Ridge: { icon: ChartScatter, color: '#c9b0f6' },
  Electronics: { icon: CircuitBoard, color: '#9bd7b4' },
  'FPGA & ASIC workshop': { icon: Cpu, color: '#e4c589' },
  'Real-time simulation': { icon: Timer, color: '#94d1cd' },
};

export function hasTechnologyIcon(name: string) { return Boolean(logos[name] || symbols[name]); }

export function TechnologyIcon({ name }: { name: string }) {
  const logo = logos[name];
  if (logo) return <span className={`technology-icon ${logo.className ?? ''}`} aria-hidden="true"><img src={`/images/technologies/${logo.file}`} alt="" decoding="async" /></span>;
  const symbol = symbols[name];
  if (!symbol) return null;
  const Icon = symbol.icon;
  return <span className="technology-icon" aria-hidden="true"><Icon strokeWidth={1.7} color={symbol.color} /></span>;
}
