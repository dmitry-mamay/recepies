# Recipe Guidelines

## Creating a recipe

- Create a directory at `src/content/recipes/<slug>/`.
- Use `src/content/recipes/_template/index.md` as the starting point.
- Keep Russian frontmatter and any additional Markdown notes in `index.md`.
- Always create `index.en.md` next to `index.md` by translating the Russian
  recipe in full. Translate all visible content, including ingredient groups,
  step titles and text, tips, notes, and image alt text. Preserve meaning,
  quantities, temperatures, and times; use the same valid tag IDs in both
  languages.
- Do not create a partial or untranslated English file. Every recipe must have
  an English version and appear in English listings and routes.
- Do not add unknown fields: the collection schema is strict.
- Use only tag IDs defined in `src/data/recipe-tags.ts` in both languages;
  labels and interface text are defined in `src/i18n.ts`.

## Images

- Copy every image supplied for the recipe from its intake folder into the
  recipe's `images/` subdirectory. Do not copy images that belong to another
  recipe.
- Reference the copied files in both language files wherever appropriate, using
  nonempty, translated alt text for every image reference.
- Use only files that actually exist in the recipe's `images/` subdirectory.
- Never invent image paths or use external URLs as images.
- Do not specify an image field until the corresponding file exists.
- Provide nonempty alt text for every specified image.
- If no images are supplied for a recipe, do not add placeholders or image
  references; note the missing assets in the PR description.
- If a step has no corresponding photo, omit its `image` field and note it in
  the PR description.

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
