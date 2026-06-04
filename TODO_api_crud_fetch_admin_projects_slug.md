# TODO: Fix Projects slug pages 404 + integrate backend

## Goal
`/projects/[slug]` pe backend se project fetch karke show karna. Abhi frontend static `siteData.projects` se chal raha hai, backend me slug support nahi hai.

## Step 1 — Backend: Project model update
- `backend/src/models/Project.js` me `slug` field add.
- Existing docs ko migrate karna (seed/one-time script) if needed.
- Slug unique index.

## Step 2 — Backend: Add slug-based route
- `backend/src/routes/projectRoutes.js` me add:
  - `router.get('/slug/:slug', getProjectBySlug)`

## Step 3 — Backend: Controller implementation
- `backend/src/controllers/projectController.js` me `getProjectBySlug`:
  - `Project.findOne({ slug, status:'active' })`
  - 404 if not found

## Step 4 — Frontend: Update slug page to use API
- `miraj/app/projects/[slug]/page.jsx` me:
  - backend fetch on server (or client) using `fetchProjectBySlug(params.slug)`
  - `generateStaticParams` remove ya dynamic mode.

## Step 5 — Frontend: Mapping
- Backend field names map to UI expectations:
  - `projectTitle` -> `title`
  - `clientName` -> `client`
  - `images[0]` -> `image`
  - `industry` -> `category`
  - `completionDate` -> `year`
  - `technologiesUsed` -> `tags`
  - outcome may be missing; create fallback

## Step 6 — Test
- Visit `/projects` then click any card => `/projects/<slug>` must not return 404.
- Direct open `/projects/<slug>` must work.

