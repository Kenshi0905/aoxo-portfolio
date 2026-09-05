import { useEffect, useState } from 'react';
import { loadTheme, saveTheme } from '../lib/theme-preference';

export function useTheme() {
  const [theme, setTheme] = useState(() => loadTheme(() => window.localStorage));
  useEffect(() => saveTheme(() => window.localStorage, theme), [theme]);
  return [theme, setTheme] as const;
}
