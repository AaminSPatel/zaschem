"use client";

import { useEffect, useMemo, useState } from 'react';

// Exact color codes extracted from ZASCHEM Logo and Power Plant Banner
// Primary Blue: #0082FB (Vibrant Industrial Blue)
// Primary Orange: #FF6600 / #F15A24 (Safety Orange)
// Deep Night Blue (from banner background): #021124 / #051833

export const THEMES = [
  /* { 
    id: 'deep-blue-dark', 
    label: 'Deep Blue Industrial', 
    accentBlue: '#0082FB', 
    accentOrange: '#FF6600', 
    bgDark: '#021124',     // Super deep industrial blue (Not pure black)
    bgDarker: '#010914',   // Even deeper night sky blue
    card: '#051833'        // Dark blue card background
  }, */
/*   { 
    id: 'orange-power', 
    label: 'Safety Orange Power', 
    accentBlue: '#0082FB', 
    accentOrange: '#0082FB', 
    bgDark: '#B34700',     // Darkened premium orange for background to avoid eye strain
    bgDarker: '#803300',   // Darker orange tone
    card: '#FF6600'        // Pure vibrant orange card
  }, */
  { 
    id: 'zaschem-classic', 
    label: 'Zaschem Classic Blue', 
    accentBlue: '#FF8800', 
    accentOrange: '#FF8800', 
    bgDark: '#005FBA',     // Mid-tone corporate blue background
    bgDarker: '#004385',   // Deeper blue
    card: '#0071DC'        // Bright logo-blue card
  }/* ,
  { 
    id: 'stark-duo', 
    label: 'Minimal Stark Duo', 
    accentBlue: '#0082FB', 
    accentOrange: '#FF6600', 
    bgDark: '#0b0f19',     // Blueish-tinted charcoal (keeps black minimal, looks premium)
    bgDarker: '#060911',   // Darkest tone
    card: '#131a2b'        // Blue-gray card
  }, */
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

  // Black & White ko rules ke mutabik control karne ke liye:
  // Sabhi themes dark-centric hain, isliye main text 'White' (#ffffff) rahega
  document.documentElement.style.setProperty('--brand-light', '#ffffff');
  document.documentElement.style.setProperty('--brand-muted', 'rgba(255, 255, 255, 0.75)');
  document.documentElement.style.setProperty('--brand-border', 'rgba(255, 255, 255, 0.15)');

  // Contrast handling on colored backgrounds
  document.documentElement.style.setProperty('--brand-contrast-on-bg', '#ffffff');

  // Buttons configurations (Using the client's preferred Orange & Blue)
  document.documentElement.style.setProperty('--btn-primary-bg', theme.accentOrange);
  document.documentElement.style.setProperty('--btn-primary-bg-hover', theme.accentBlue);
  document.documentElement.style.setProperty('--btn-primary-border', 'rgba(255, 255, 255, 0.2)');
}

export default function useTheme() {
  const initial = useMemo(() => {
    if (typeof window === 'undefined') return THEMES[0].id;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved || THEMES[0].id;
  }, []);

  const [themeId, setThemeId] = useState('zaschem-classic');

  useEffect(() => {
    applyThemeToDocument(themeId);
    window.localStorage.setItem(STORAGE_KEY, themeId);
  }, [themeId]);

  useEffect(() => {
    applyThemeToDocument(themeId);
  }, []);

  return { themeId, setThemeId, themes: THEMES };
}