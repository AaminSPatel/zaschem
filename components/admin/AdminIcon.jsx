'use client';

import * as Fa6Icons from 'react-icons/fa6';

const DEFAULT_SIZE = 18;

const SIZE_MAP = {
  xs: 14,
  sm: 16,
  md: 18,
  lg: 22,
  xl: 26,
};

export default function AdminIcon({
  name,
  size = 'md',
  className = '',
  color,
  title,
  ariaLabel,
  // allow passing aria-label as well (JS syntax doesn’t like destructuring keys with hyphen)
}) {

  const actualSize = typeof size === 'number' ? size : (SIZE_MAP[size] ?? DEFAULT_SIZE);

  const IconComponent = Fa6Icons?.[name];

  if (!IconComponent) {

    // Fallback: show a small square so layout doesn't break.
    return (
      <span
        className={`inline-flex items-center justify-center rounded border border-gray-200 bg-gray-50 ${className}`}
        style={{ width: actualSize, height: actualSize, color: color || undefined }}
        aria-label={ariaLabel || title || name || 'icon'}
        title={title}
      />

    );
  }

  return (
    <IconComponent
      size={actualSize}
      className={className}
      style={color ? { color } : undefined}
      aria-label={ariaLabel || title || name || 'icon'}
      title={title}
    />

  );
}

