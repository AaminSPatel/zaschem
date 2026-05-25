"use client";

import { useEffect, useMemo, useState } from 'react';

export const THEMES = [
  { id: 'blue-dark', label: 'Blue', accentBlue: '#0F5EFF', accentOrange: '#F97316', bgDark: '#0a0a0a', bgDarker: '#050505', card: '#111111' },
  { id: 'orange-dark', label: 'Orange', accentBlue: '#F97316', accentOrange: '#0F5EFF', bgDark: '#0a0a0a', bgDarker: '#050505', card: '#111111' },
  { id: 'green-dark', label: 'Green', accentBlue: '#22c55e', accentOrange: '#F97316', bgDark: '#06110a', bgDarker: '#040b08', card: '#0d1a13' },
  { id: 'light', label: 'Light', accentBlue: '#0F5EFF', accentOrange: '#F97316', bgDark: '#ffffff', bgDarker: '#f5f7ff', card: '#f3f4f6' },
];

const STORAGE_KEY = 'zaschem_theme';

export function getThemeById(id) {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}

function applyThemeToDocument(themeId) {
  if (typeof document === 'undefined') return;

  const theme = getThemeById(themeId);

  document.documentElement.setAttribute('data-theme', theme.id);
  document.documentElement.style.setProperty('--brand-blue', theme.accentBlue);
  document.documentElement.style.setProperty('--brand-orange', theme.accentOrange);
  document.documentElement.style.setProperty('--brand-dark', theme.bgDark);
  document.documentElement.style.setProperty('--brand-darker', theme.bgDarker);
  document.documentElement.style.setProperty('--brand-card', theme.card);

  // Base light/dark text helpers
  document.documentElement.style.setProperty('--brand-light', theme.id === 'light' ? '#111827' : '#ffffff');
  document.documentElement.style.setProperty('--brand-muted', theme.id === 'light' ? 'rgba(17, 24, 39, 0.7)' : 'rgba(255, 255, 255, 0.7)');
  document.documentElement.style.setProperty('--brand-border', theme.id === 'light' ? 'rgba(17, 24, 39, 0.16)' : 'rgba(255, 255, 255, 0.16)');

  // ✅ New: contrast text color for headings/strong text on backgrounds.
  // - light theme bg is light -> use dark text
  // - dark theme bg is dark  -> use white text
  document.documentElement.style.setProperty('--brand-contrast-on-bg', theme.id === 'light' ? '#111827' : '#ffffff');


  // button bg/hover
  document.documentElement.style.setProperty('--btn-primary-bg', theme.accentBlue);
  document.documentElement.style.setProperty('--btn-primary-bg-hover', theme.accentBlue);
  document.documentElement.style.setProperty('--btn-primary-border', theme.id === 'light' ? 'rgba(17, 24, 39, 0.15)' : 'rgba(255, 255, 255, 0.15)');
}

export default function useTheme() {
  const initial = useMemo(() => {
    if (typeof window === 'undefined') return THEMES[0].id;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved || THEMES[0].id;
  }, []);

  const [themeId, setThemeId] = useState(initial);

  useEffect(() => {
    applyThemeToDocument(themeId);
    window.localStorage.setItem(STORAGE_KEY, themeId);
  }, [themeId]);

  useEffect(() => {
    // handle first paint mismatch
    applyThemeToDocument(themeId);
  }, []);

  return { themeId, setThemeId, themes: THEMES };
}

