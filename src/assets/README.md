# Assets

Drop your real images here once you're ready to replace the placeholders:

- `avatar.jpg` — original profile photo; the site uses the resized `avatar-optimized.jpg`
- `cv/` — CV PDFs for the "Download CV" selector (`CV_French.pdf`, `Eya_Zayeni_Resume.pdf`)
- `projects/*-web.mp4` — compressed demo videos (the originals aren't imported)
- `projects/project-alpha.png`, `project-beta.png`, `project-gamma.png` — featured project screenshots
- `projects/*.png` — other project screenshots
- `certificates/*.pdf` or `*.png` — certification files
- `logos/*.svg` — company / school logos

After adding a file, import it in the relevant component and swap the
`<ImagePlaceholder />` for a real `<img src={yourImage} />`, or replace the
`imagePlaceholder` fields in [`src/data/portfolio.ts`](../data/portfolio.ts)
with an imported image reference.
