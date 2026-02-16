import type { CardVariantGroup } from "@workspace/core";

import { cardIsExactCombine, hasUnlistedCard } from ".";

/**
 * Determines if a group of cards are valid for rental.
 */
export const cardsGroupIsValidForRental = (group: CardVariantGroup) => {
  const { cards, variant } = group;

  if (cards.length === 0) {
    return false;
  }

  if (!hasUnlistedCard(cards)) {
    return false;
  }

  if (!cardIsExactCombine(variant)) {
    return false;
  }

  return true;
};
