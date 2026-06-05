# TODO: Theme removal + Tailwind-only styling migration

- [ ] Confirm current theme artifacts:
  - [ ] Remove `miraj/components/theme/useTheme.js` usage (ThemeButtons) if required.
  - [ ] Remove theme-root / data-theme / CSS variables mapping from `miraj/app/globals.css`.
- [ ] Save extracted theme colors (brand/background/button/border) into a comment block inside `globals.css`.
- [ ] Delete the Tailwind v4 `@theme inline { ... }` section and any CSS variable-based color utilities (`.bg-brand-*`, `.text-brand-*`, `.border-brand-*`, `.btn-primary`, etc.), so design relies on Tailwind classes.
- [ ] Replace all usage of `bg-brand-*`, `text-brand-*`, `border-brand-*`, `bg-brand-dark`, etc. across components/pages with hardcoded Tailwind color classes matching the extracted palette.
- [ ] Replace custom button class usage (`btn-primary`, `btn-secondary`, etc.) with Tailwind equivalents (or keep only non-color structural styles if needed).
- [ ] Remove any remaining dependency on `theme` toggling in UI components.
- [ ] Ensure `miraj/app/layout.jsx` no longer sets `bg-brand-dark text-brand-light` (swap to hardcoded Tailwind colors).
- [ ] Run `npm run lint` and `npm run build` (or tests) to ensure compilation.

