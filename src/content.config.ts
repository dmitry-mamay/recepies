import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

import { RECIPE_TAGS } from "./data/recipe-tags";

const ingredientSchema = z
  .object({
    item: z.string().trim().min(1),
    amount: z.string().trim().min(1).optional(),
    note: z.string().trim().min(1).optional(),
  })
  .strict();

const ingredientGroupSchema = z
  .object({
    title: z.string().trim().min(1).optional(),
    items: z.array(ingredientSchema).min(1),
  })
  .strict();

function createRecipeCollection(pattern: string) {
  return defineCollection({
    loader: glob({
      base: "./src/content/recipes",
      pattern,
    }),
  schema: ({ image }) => {
    const stepSchema = z
      .object({
        title: z.string().trim().min(1),
        text: z.string().trim().min(1),
        image: image().optional(),
        imageAlt: z.string().trim().min(1).optional(),
      })
      .strict()
      .superRefine((step, context) => {
        if (step.image && !step.imageAlt) {
          context.addIssue({
            code: "custom",
            path: ["imageAlt"],
            message: "imageAlt обязателен, если у шага указано image",
          });
        }
      });

    return z
      .object({
        title: z.string().trim().min(1),
        label: z.string().trim().min(1).optional(),
        subtitle: z.string().trim().min(1).optional(),
        description: z.string().trim().min(1),
        image: image().optional(),
        imageAlt: z.string().trim().min(1).optional(),
        servings: z
          .object({
            min: z.number().int().positive(),
            max: z.number().int().positive().optional(),
            note: z.string().trim().min(1).optional(),
          })
          .strict(),
        prepMinutes: z.number().int().nonnegative().optional(),
        cookMinutes: z.number().int().nonnegative().optional(),
        cookMinutesMax: z.number().int().nonnegative().optional(),
        restMinutes: z.number().int().nonnegative().optional(),
        restLabel: z.string().trim().min(1).optional(),
        restNote: z.string().trim().min(1).optional(),
        tags: z.array(z.enum(RECIPE_TAGS)).min(1),
        ingredientsImage: image().optional(),
        ingredientsImageAlt: z.string().trim().min(1).optional(),
        ingredients: z.array(ingredientGroupSchema).min(1),
        steps: z.array(stepSchema).min(1),
        tips: z.array(z.string().trim().min(1)).min(1).optional(),
        source: z.url().optional(),
      })
      .strict()
      .superRefine((recipe, context) => {
        if (recipe.image && !recipe.imageAlt) {
          context.addIssue({
            code: "custom",
            path: ["imageAlt"],
            message: "imageAlt обязателен, если указано главное image",
          });
        }

        if (recipe.ingredientsImage && !recipe.ingredientsImageAlt) {
          context.addIssue({
            code: "custom",
            path: ["ingredientsImageAlt"],
            message:
              "ingredientsImageAlt обязателен, если указано ingredientsImage",
          });
        }

        if (
          recipe.servings.max !== undefined &&
          recipe.servings.max < recipe.servings.min
        ) {
          context.addIssue({
            code: "custom",
            path: ["servings", "max"],
            message: "max не может быть меньше min",
          });
        }

        if (
          recipe.cookMinutesMax !== undefined &&
          recipe.cookMinutes === undefined
        ) {
          context.addIssue({
            code: "custom",
            path: ["cookMinutesMax"],
            message: "cookMinutes обязателен, если указано cookMinutesMax",
          });
        }

        if (
          recipe.cookMinutesMax !== undefined &&
          recipe.cookMinutes !== undefined &&
          recipe.cookMinutesMax < recipe.cookMinutes
        ) {
          context.addIssue({
            code: "custom",
            path: ["cookMinutesMax"],
            message: "cookMinutesMax не может быть меньше cookMinutes",
          });
        }
      });
  },
  });
}

export const collections = {
  recipes: createRecipeCollection("[!_]*/index.md"),
  recipesEn: createRecipeCollection("[!_]*/index.en.md"),
};
