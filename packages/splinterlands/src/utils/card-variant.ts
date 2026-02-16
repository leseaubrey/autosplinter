// TODO: Review and verify

import type { CardRarity, CardVariant } from "@workspace/core";

export const alphaCardCombineRates = {
  COMMON: [1, 2, 4, 9, 19, 39, 79, 129, 229, 379],
  RARE: [1, 2, 4, 8, 16, 26, 46, 86],
  EPIC: [1, 2, 4, 8, 16, 32],
  LEGENDARY: [1, 2, 4, 8],
} satisfies Record<CardRarity, number[]>;

export const alphaGoldCardCombineRates = {
  COMMON: [0, 0, 0, 1, 2, 4, 7, 11, 19, 31],
  RARE: [0, 0, 1, 2, 3, 5, 9, 17],
  EPIC: [0, 0, 1, 2, 4, 8],
  LEGENDARY: [0, 1, 2, 3],
} satisfies Record<CardRarity, number[]>;

export const betaCardCombineRates = {
  COMMON: [1, 3, 5, 12, 25, 52, 105, 172, 305, 505],
  RARE: [1, 3, 5, 11, 21, 35, 61, 115],
  EPIC: [1, 3, 6, 11, 23, 46],
  LEGENDARY: [1, 3, 5, 11],
} satisfies Record<CardRarity, number[]>;

export const betaGoldCardCombineRates = {
  COMMON: [0, 0, 0, 1, 2, 4, 8, 13, 23, 38],
  RARE: [0, 0, 1, 2, 4, 7, 12, 22],
  EPIC: [0, 0, 1, 3, 5, 10],
  LEGENDARY: [0, 1, 2, 4],
} satisfies Record<CardRarity, number[]>;

// XP System changes with Untamed (224 is first untamed card). Untamed and onwards use
// the below rates with the exception of Halfling Alchemist & Mighty Dricken
export const cardCombineRates = {
  COMMON: [1, 5, 14, 30, 60, 100, 150, 220, 300, 400],
  RARE: [1, 5, 14, 25, 40, 60, 85, 115],
  EPIC: [1, 4, 10, 20, 32, 46],
  LEGENDARY: [1, 3, 6, 11],
} satisfies Record<CardRarity, number[]>;

export const goldCardCombineRates = {
  COMMON: [0, 0, 1, 2, 5, 9, 14, 20, 27, 38],
  RARE: [0, 1, 2, 4, 7, 11, 16, 22],
  EPIC: [0, 1, 2, 4, 7, 10],
  LEGENDARY: [0, 1, 2, 4],
} satisfies Record<CardRarity, number[]>;

// Alpha Promo Cards: 75 - "Dragon Whelp", 76 - "Royal Dragon Archer", 77 - "Shin-Lo", 78 - "Neb Seni",
function usesAlphaCombineRates(card: CardVariant) {
  return card.edition === 0 || (card.edition === 2 && card.cardDetailId <= 77);
}

// Beta Cards Start at 79 - "Highland Archer"
function usesBetaCombineRates(card: CardVariant) {
  // Halfling Alchemist || Mighty Dricken
  if (card.cardDetailId === 237 || card.cardDetailId === 238) {
    return true;
  }

  return (
    card.edition === 1 ||
    (card.edition === 2 && card.cardDetailId <= 223) ||
    (card.edition === 3 && card.cardDetailId <= 223)
  );
}

/**
 * Determine which card combine rates to use
 */
function determineCardCombineRates(card: CardVariant) {
  if (usesAlphaCombineRates(card)) {
    return card.gold ? alphaGoldCardCombineRates : alphaCardCombineRates;
  }

  if (usesBetaCombineRates(card)) {
    return card.gold ? betaGoldCardCombineRates : betaCardCombineRates;
  }

  return card.gold ? goldCardCombineRates : cardCombineRates;
}

/**
 * Calculates the level of a card
 */
export const calculateCardLevel = (card: CardVariant) => {
  const combineRates = determineCardCombineRates(card);

  // Get the combine rates for the given rarity
  const rates = combineRates[card.rarity];

  return rates.filter((r) => r <= card.bcx).length;
};

/**
 * Checks if a card is an exact combine. An exact combine
 * is where the BCX matches one of the possible card combination
 * levels for its rarity.
 */
export const cardIsExactCombine = (card: CardVariant) => {
  const combineRates = determineCardCombineRates(card);

  // Get the combine rates for the given rarity
  const rates = combineRates[card.rarity];

  // Check if BCX matches any of the combine rates
  return rates.includes(card.bcx);
};
