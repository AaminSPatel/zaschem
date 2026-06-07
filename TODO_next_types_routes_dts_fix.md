# Next.js routes.d.ts typecheck fix plan

## Root cause
- `next build` is failing TypeScript typecheck in `.next/dev/types/routes.d.ts` with a syntax error:
  - `lotMap[LayoutRoute]]: React.ReactNode` (broken/generated file)

## Fix strategy
1. Stop relying on broken `.next/dev/types/routes.d.ts` by fully removing Next build cache.
2. Re-run `npm run build` to regenerate types.
3. If the regenerated file still contains the syntax error, locate the source templates causing it:
   - update/repair `miraj/app/layout.jsx` or any `app/layout`/route definition issues.
4. If regeneration still fails, force Next to use the correct TS generation path:
   - ensure no edits are made to `.next/**`.

## Commands to run
- `rmdir /s /q .next` (in `miraj/`)
- `npm run build`

## Notes
- Next.js generated files may become corrupted when the repo has mixed Next/TS versions or the build is interrupted mid-generation.

