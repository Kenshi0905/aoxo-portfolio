import { useEffect, useState } from 'react';

const nearWave = [
  'M-180 505 C180 545 470 313 865 390 S1360 570 1780 440',
  'M-180 437 C240 340 515 520 910 432 S1390 345 1780 490',
  'M-180 505 C180 545 470 313 865 390 S1360 570 1780 440',
];
const farWave = [
  'M-180 435 C200 345 575 505 965 435 S1440 365 1780 485',
  'M-180 525 C250 555 590 335 950 415 S1420 585 1780 435',
  'M-180 435 C200 345 575 505 965 435 S1440 365 1780 485',
];
const ribbonReturns = [
  [
    'L1780 515 C1440 395 1355 410 965 465 C575 535 200 375-180 465Z',
    'L1780 470 C1420 620 1310 530 950 450 C590 370 250 590-180 560Z',
    'L1780 515 C1440 395 1355 410 965 465 C575 535 200 375-180 465Z',
  ],
  [
    'L1780 480 C1360 610 1260 512 865 435 C470 358 180 590-180 550Z',
    'L1780 535 C1390 390 1305 389 910 477 C515 565 240 385-180 482Z',
    'L1780 480 C1360 610 1260 512 865 435 C470 358 180 590-180 550Z',
  ],
];

/** One continuously mounted ribbon carries the welcome into the portfolio. */
export function RibbonBackground() {
  const [motionEnabled, setMotionEnabled] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => setMotionEnabled(!preference.matches);
    preference.addEventListener('change', syncMotion);
    return () => preference.removeEventListener('change', syncMotion);
  }, []);

  return <div className="ambient" aria-hidden="true">
    <div className="ambient-light" />
    <div className="ribbon-glow" />
    <svg className="ribbon-field" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="startup-silver" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#91a7c3" stopOpacity=".08" /><stop offset=".25" stopColor="#d5e4fa" stopOpacity=".35" /><stop offset=".58" stopColor="#e8f0fc" stopOpacity=".68" /><stop offset=".85" stopColor="#b7cfea" stopOpacity=".34" /><stop offset="1" stopColor="#91a7c3" stopOpacity=".05" />
        </linearGradient>
        <linearGradient id="startup-silk" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#e1edff" stopOpacity=".02" /><stop offset=".5" stopColor="#c4d7f0" stopOpacity=".07" /><stop offset="1" stopColor="#c4d7f0" stopOpacity=".17" />
        </linearGradient>
        <filter id="startup-soft-light" x="-20%" y="-100%" width="140%" height="300%"><feGaussianBlur stdDeviation="9" /></filter>
      </defs>
      {[farWave, nearWave].map((wave, layer) => <g key={layer} className={`ribbon-layer ribbon-layer-${layer}`}>
        <path fill="url(#startup-silk)" d={`${wave[0]} ${ribbonReturns[layer][0]}`}>
          {motionEnabled && <animate attributeName="d" dur="12s" repeatCount="indefinite" calcMode="spline" keyTimes="0;.5;1" keySplines=".45 0 .55 1;.45 0 .55 1" values={wave.map((path, frame) => `${path} ${ribbonReturns[layer][frame]}`).join(';')} />}
        </path>
        <path d={wave[0]} fill="none" stroke="url(#startup-silver)" strokeWidth="19" opacity=".35" filter="url(#startup-soft-light)">
          {motionEnabled && <animate attributeName="d" values={wave.join(';')} dur="12s" repeatCount="indefinite" calcMode="spline" keyTimes="0;.5;1" keySplines=".45 0 .55 1;.45 0 .55 1" />}
        </path>
        {[0, 6, 18, 32].map((offset, i) => <path key={offset} d={wave[0]} transform={`translate(0 ${offset})`} fill="none" stroke="url(#startup-silver)" strokeWidth={i === 0 ? 1.2 : .6} opacity={1 - i * .22}>
          {motionEnabled && <animate attributeName="d" values={wave.join(';')} dur="12s" repeatCount="indefinite" calcMode="spline" keyTimes="0;.5;1" keySplines=".45 0 .55 1;.45 0 .55 1" />}
        </path>)}
      </g>)}
    </svg>
    <div className="particles">{Array.from({ length: 9 }, (_, i) => <i key={i} style={{ left: `${(i * 37 + 9) % 100}%`, top: `${(i * 23 + 13) % 97}%`, animationDelay: `${-i * 4.7}s`, animationDuration: `${34 + i % 9}s` }} />)}</div>
    <div className="ambient-vignette" />
  </div>;
}
