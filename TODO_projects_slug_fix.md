# TODO: Fix /projects/[slug] page (fetchSlug + backend integration)

## Step 1: Identify current bug
- `/miraj/app/projects/[slug]/page.jsx` me `fetchProjects().find(...)` se slug matching ho raha hai
- `generateMetadata` me `fetchProjectBySlug` call hai, lekin import/definition missing hai

## Step 2: Implement correct slug fetch
- `/miraj/app/projects/[slug]/page.jsx` me `fetchProjectBySlug(params.slug)` use karo
- fallback logic hatao/limit karo (server route fail ho to related/projects-based fallback optional)

## Step 3: Fix metadata
- `generateMetadata` me bhi `fetchProjectBySlug` ka correct import use karo

## Step 4: Fix mapping safety
- `project.tags` array ensure karo
- `project.category` toUpperCase guard karo
- `project.image` fallback handle karo

## Step 5: Test
- `/projects` -> card click -> `/projects/<slug>` 404 na ho
- Direct `/projects/<slug>` open karne pe bhi page render ho

