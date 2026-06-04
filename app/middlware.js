// middleware deprecated: intentionally disabled.
// Admin route protection is handled in the UI + API layer.
// File kept to avoid Next.js resolution issues.

export function middleware() {
  // no-op
  return null;
}

// no matcher => Next middleware run hi nahi karega
export const config = {
  matcher: [],
};


