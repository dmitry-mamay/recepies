import type { CollectionEntry } from "astro:content";

import type { Locale } from "../i18n";
import { localizedPath } from "../i18n";

export type RecipeEntry =
  | CollectionEntry<"recipes">
  | CollectionEntry<"recipesEn">;

export function getRecipeSlug(recipe: RecipeEntry): string {
  return recipe.id.split("/")[0];
}

export function getAvailableTranslations(
  originals: CollectionEntry<"recipes">[],
  translations: CollectionEntry<"recipesEn">[],
): CollectionEntry<"recipesEn">[] {
  const originalSlugs = new Set(originals.map(getRecipeSlug));
  return translations.filter((recipe) =>
    originalSlugs.has(getRecipeSlug(recipe)),
  );
}

export function getRecipeUrl(recipe: RecipeEntry, locale: Locale): string {
  return localizedPath(`/recipes/${getRecipeSlug(recipe)}/`, locale);
}

export function formatMinutes(minutes: number, locale: Locale): string {
  if (minutes < 60) {
    return locale === "en" ? `${minutes} min` : `${minutes} мин`;
  }

  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;

  return remainder === 0
    ? locale === "en" ? `${hours} hr` : `${hours} ч`
    : locale === "en"
      ? `${hours} hr ${remainder} min`
      : `${hours} ч ${remainder} мин`;
}

export function formatMinuteRange(
  minimumMinutes: number,
  locale: Locale,
  maximumMinutes?: number,
): string {
  if (maximumMinutes === undefined || maximumMinutes === minimumMinutes) {
    return formatMinutes(minimumMinutes, locale);
  }

  if (minimumMinutes < 60 && maximumMinutes < 60) {
    return `${minimumMinutes}–${maximumMinutes} ${locale === "en" ? "min" : "мин"}`;
  }

  return `${formatMinutes(minimumMinutes, locale)}–${formatMinutes(maximumMinutes, locale)}`;
}

export function minutesToIso(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  const hoursPart = hours > 0 ? `${hours}H` : "";
  const minutesPart = remainder > 0 ? `${remainder}M` : "";

  return `PT${hoursPart}${minutesPart || (hours === 0 ? "0M" : "")}`;
}

export function formatYield(
  servings: RecipeEntry["data"]["servings"],
  locale: Locale,
): string {
  const range =
    servings.max && servings.max !== servings.min
      ? `${servings.min}–${servings.max}`
      : `${servings.min}`;
  const count = servings.max ?? servings.min;
  const lastTwoDigits = count % 100;
  const lastDigit = count % 10;
  const portionWord = locale === "en"
    ? servings.min === 1 && count === 1 ? "serving" : "servings"
    : lastTwoDigits >= 11 && lastTwoDigits <= 14
      ? "порций"
      : lastDigit === 1
        ? "порция"
        : lastDigit >= 2 && lastDigit <= 4
          ? "порции"
          : "порций";

  return `${range} ${portionWord}${servings.note ? ` (${servings.note})` : ""}`;
}

export function ingredientToText(
  ingredient: RecipeEntry["data"]["ingredients"][number]["items"][number],
): string {
  const amount = ingredient.amount ? `${ingredient.amount} ` : "";
  const note = ingredient.note ? ` (${ingredient.note})` : "";

  return `${amount}${ingredient.item}${note}`;
}
