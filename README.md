# Recipe Site

A static recipe site built with Astro. Recipes are stored in Markdown and
rendered as responsive pages with print styles and JSON-LD `Recipe` data.

## Getting started

A current Node.js LTS release is required.

```sh
npm install
npm run dev
```

Check types and content:

```sh
npm run check
```

Build for production:

```sh
npm run build
```

Set `SITE_URL` for correct canonical URLs and the sitemap in production builds:

```sh
SITE_URL=https://recipes.example.com npm run build
```

In PowerShell:

```powershell
$env:SITE_URL = "https://recipes.example.com"
npm run build
```

## Adding a recipe

1. Copy `src/content/recipes/_template/` to `src/content/recipes/<slug>/`.
2. Fill in `index.md` for the Russian version.
3. Add the actual image files to the `images/` subdirectory.
4. Add image fields only after the corresponding files exist.
5. Provide the corresponding alt-text field for every image.
6. To publish an English version, add `index.en.md` in the same recipe directory.
   Translate the title, description, ingredient groups, amounts and units,
   steps, tips, and image alt text. Keep the same numeric quantities, times,
   servings, and tag IDs; the English page can reference the same `images/`.
   Do not create a partial `index.en.md`: a recipe without a complete English
   translation is omitted from English listings and has no English recipe URL.
7. Run `npm run check` and `npm run build`.

Directories whose names start with `_` are excluded from the Content Collection.
Allowed tags are defined in `src/data/recipe-tags.ts`.
The shared interface and English tag labels are defined in `src/i18n.ts`.

## Languages and URLs

Russian is served at `/`, `/recipes/<slug>/`, and `/tags/<tag>/`.
English is served at `/en/`, `/en/recipes/<slug>/`, and `/en/tags/<tag>/`.
The language switch links to the same page in the other language when it exists;
otherwise it links to that language's catalog. Tag IDs stay the same in both
URLs; their visible labels are translated. Available translations have
reciprocal `hreflang` links, and each page has its own canonical URL, localized
metadata, and (on recipe pages) localized Recipe JSON-LD.

## Images

Recommended specifications:

| Purpose | Size | Aspect ratio | Format |
|---|---:|---:|---|
| Hero image | 1600×1200 | 4:3 | JPEG, WebP, or AVIF |
| Ingredients | 1200×900 | 4:3 | JPEG, WebP, or AVIF |
| Recipe step | 1200×800 | 3:2 | JPEG, WebP, or AVIF |

Use images without text or watermarks. Keep lighting, backgrounds, and color
grading consistent within each recipe. These sizes are recommendations and
do not block the build.

Images are stored in each recipe's `images/` subdirectory and referenced in
frontmatter with alt text.

## Project structure

- `src/content.config.ts` — strict recipe collection schema.
- `src/content/recipes/` — Russian and optional English Markdown recipes and
  their local images.
- `src/pages/index.astro` — recipe catalog on the home page.
- `src/pages/recipes/[slug].astro` — Russian recipe pages.
- `src/pages/en/` — English catalog, recipe pages, and tag pages.
- `src/pages/tags/` — Russian tag pages.
- `src/components/` — recipe page and card components.
- `src/styles/global.css` — shared, responsive, and print styles.

A recipe without a hero image remains available and renders correctly, but
the build emits a warning.
