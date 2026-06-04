# Projects API Notes

## Current status in repo
- Frontend `miraj/app/projects/page.jsx` currently uses local data import: `import { projects } from "@/data/siteData";`
- Backend `backend/src/routes/projectRoutes.js` is either not present or currently unreadable/corrupted in this snapshot.
- No working backend projects CRUD endpoints were identified in the code read so far.

## What is needed to replace mock data with backend
1) Backend must expose endpoints, for example:
   - GET /api/projects
   - GET /api/projects/:id
2) Create/verify `projects` controller + route.
3) Frontend should call those endpoints using `fetch` / existing apiClient pattern.
4) Update `miraj/app/projects/page.jsx` to render fetched projects instead of mock `projects`.

## Routes to implement (example)
- GET    `${API_BASE}/api/projects` -> list all projects
- GET    `${API_BASE}/api/projects/:id` -> single project
- POST   `${API_BASE}/api/projects` -> create
- PUT    `${API_BASE}/api/projects/:id` -> update
- DELETE `${API_BASE}/api/projects/:id` -> delete

Once you confirm backend DB model for projects, I can wire the endpoints + client page.

