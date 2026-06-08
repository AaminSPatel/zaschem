# TODO: Navbar/Footer services slug links -> server integrated (with local fallback)

## Step 1 — Identify existing local service links
- Read `miraj/components/layout/Navbar.jsx` and `miraj/components/layout/Footer.jsx`.
- Confirm current hardcoded `/services/<slug>` links and where they are rendered.

## Step 2 — Fetch services from backend and build slug links
- Reuse existing client fetch helper: `fetchServices()` from `miraj/lib/apiClient.js`.
- Implement a small client component/hook to:
  - Show local fallback links immediately.
  - Fetch server services on mount.
  - While fetching: keep local links visible.
  - After fetch succeeds: replace links with server slug/title mappings.
  - On fetch failure: keep local links.

## Step 3 — Update Navbar
- Replace hardcoded `navLinks` service children with dynamic list.
- Maintain the same labels when server data not available (use local fallback from `app/data/siteData.js`).

## Step 4 — Update Footer
- Replace `serviceLinks` mapping with dynamic slug links.
- Keep existing footer styling and structure.

## Step 5 — Ensure correct slugs + future-proofing
- Use `service.slug` from API response.
- Use `service.title` as link label; fallback to local title.
- Ensure link hrefs always follow `/services/${slug}`.

## Step 6 — Testing (in progress)
- Update Navbar/Footer to dynamic serviceLinks with local fallback.
- Verify:
  - Initially local links render.
  - After API returns, links update.
  - If API fails, no crash and local links remain.



