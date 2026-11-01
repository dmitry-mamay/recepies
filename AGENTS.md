# Recipe Guidelines

## Creating a recipe

- Create a directory at `src/content/recipes/<slug>/`.
- Use `src/content/recipes/_template/index.md` as the starting point.
- Keep Russian frontmatter and any additional Markdown notes in `index.md`.
- If an English translation is available, put its frontmatter and notes in
  `index.en.md` next to `index.md`. Translate all visible content and alt text,
  preserve quantities and times, and reuse the recipe's `images/` files.
- Do not create an English file with partial or untranslated content. Recipes
  without `index.en.md` must remain absent from English listings and routes.
- Do not add unknown fields: the collection schema is strict.
- Use only tag IDs defined in `src/data/recipe-tags.ts` in both languages;
  labels and interface text are defined in `src/i18n.ts`.

## Images

- Use only files that actually exist in the recipe's `images/` subdirectory.
- Never invent image paths or use external URLs as images.
- Do not specify an image field until the corresponding file exists.
- Provide nonempty alt text for every specified image.
- If a step has no photo, omit its `image` field and leave a TODO note in the PR description.
- A recipe may have no photos; do not add placeholders unless explicitly requested.
- Add images manually to `src/content/recipes/<slug>/images/`.

Recommended file specifications:

- `images/hero.jpg`: 1600×1200, 4:3;
- `images/ingredients.jpg`: 1200×900, 4:3;
- `images/step-N.jpg`: 1200×800, 3:2.

JPEG, WebP, and AVIF are supported. These recommendations are not enforced in CI.

## Transcribing recipe text

- Break the recipe into steps with short imperative titles.
- Preserve the meaning, quantities, temperatures, times, and proportions of the source.
- Preserve the source's ingredient groupings.
- If there are no groups, create one group without a `title`.
- Take times and servings only from the source text.
- If a required value is missing, ask for it or mark it explicitly as TODO.

## Validation

- Run `npm run check`.
- Run `npm run build`.
- Check the page at desktop, tablet, and mobile widths and in print mode.
- Validate JSON-LD when changing the recipe structure.

The reference recipe is `tiramisu`.
