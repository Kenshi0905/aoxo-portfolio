export const THEME_KEY = 'aoxo.theme';
export const themes = ['midnight', 'classic', 'amethyst'];

// Stable names keep preferences valid if the menu is reordered.
export function loadTheme(getStorage) {
  try {
    const index = themes.indexOf(getStorage().getItem(THEME_KEY));
    return index >= 0 ? index : 0;
  } catch { return 0; }
}

export function saveTheme(getStorage, index) {
  if (!themes[index]) return;
  try { getStorage().setItem(THEME_KEY, themes[index]); }
  catch { /* The theme still works for this visit when storage is unavailable. */ }
}
