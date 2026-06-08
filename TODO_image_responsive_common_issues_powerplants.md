# TODO: Responsive images fix for CommonIssuesPowerPlantsSection

## Background
CommonIssuesPowerPlantsSection.jsx me issue images ka intrinsic size zyada hai (e.g. 421x421) while displayed size chhota hai. Isse layout ke hisaab se download size optimize karna hai.

## Steps
1. CommonIssuesPowerPlantsSection.jsx identify exact rendered image/container size (circle 64px approx) and current <img> usage.
2. <img> ko Next.js <Image> se replace karna.
3. Next/Image me width/height set karna + sizes prop add karna (card size based: ~64px desktop, possibly similar on mobile).
4. CSS classes ko adjust karna so that visuals remain same (rounded-full, object-cover/contain as needed).
5. onError/fallback behavior handle karna (power_plant.avif) for missing files.
6. Next build/lint run karke ensure no errors.

