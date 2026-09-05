export type PSShape = 'cross' | 'circle' | 'square' | 'triangle';
export function PSButton({ shape }: { shape: PSShape }) {
  return <span className={`ps-symbol ps-${shape}`} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
    {shape === 'cross' && <path d="m6 6 12 12M18 6 6 18" />}{shape === 'circle' && <circle cx="12" cy="12" r="7.5" />}{shape === 'square' && <rect x="5" y="5" width="14" height="14" rx=".5" />}{shape === 'triangle' && <path d="m12 4 9 15H3Z" />}
  </svg></span>;
}
