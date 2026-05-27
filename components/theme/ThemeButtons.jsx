'use client';

import { useEffect, useMemo, useState } from 'react';
import useTheme, { THEMES } from './useTheme';

function ThemeButton({ id, active, onClick, title }) {
  const theme = THEMES.find((t) => t.id === id);

  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`theme-btn hidden ${active ? 'ring-2 ring-white/70' : ''}`}
      aria-pressed={active}
    >
      <span
        className="block w-4 h-4 rounded"
        style={{
          background: theme?.id === 'light' ? '#e5e7eb' : theme?.accentBlue ?? '#0F5EFF',
          boxShadow:
            theme?.id === 'light'
              ? 'inset 0 0 0 1px rgba(0,0,0,0.15)'
              : 'inset 0 0 0 1px rgba(255,255,255,0.15)',
        }}
      />
    </button>
  );
}

export default function ThemeButtons() {
  const { themeId, setThemeId, themes } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const btns = useMemo(() => themes.slice(0, 4), [themes]);

  return (
    <div className="hidden items-center gap-2 ml-3" aria-label="Theme selector">
      {mounted &&
        btns.map((t) => {
          const title = t.label;
          return (
            <ThemeButton
              key={t.id}
              id={t.id}
              active={themeId === t.id}
              title={title}
              onClick={() => setThemeId(t.id)}
            />
          );
        })}
    </div>
  );
}

