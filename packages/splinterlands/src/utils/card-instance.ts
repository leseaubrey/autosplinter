import type { CardInstance } from "@workspace/core";

/**
 * Checks if there are any unlisted cards.
 */
export const hasUnlistedCard = (cards: CardInstance[]) => {
  return cards.some((card) => card.marketListingStatus === null);
};

/**
 * Checks if all cards are unlisted.
 */
export const allCardsAreUnlisted = (cards: CardInstance[]) => {
  return cards.every((card) => card.marketListingStatus === null);
};

/**
 * Retrieve cards that are currently unlisted.
 */
export const getUnlistedCards = (cards: CardInstance[]) => {
  return cards.filter((card) => card.marketListingStatus === null);
};
