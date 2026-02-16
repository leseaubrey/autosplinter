import type { CardInstance } from "@workspace/core";
import { MarketListingStatus } from "@workspace/core";

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

/**
 * Checks if all listed cards are rented.
 */
export const allListedCardsRented = (cards: CardInstance[]) => {
  const listedCards = cards.filter(
    (card) => card.marketListingStatus === MarketListingStatus.Listed,
  );

  const rentedCards = cards.filter(
    (card) => card.marketListingStatus === MarketListingStatus.Rented,
  );

  return listedCards.length === 0 && rentedCards.length > 0;
};

/**
 * Get the highest rented card price.
 */
export const getHighestRentedCardPrice = (cards: CardInstance[]) => {
  return cards
    .filter((card) => card.marketListingStatus === MarketListingStatus.Rented)
    .reduce(
      (maxPrice, card) => Math.max(maxPrice, card.marketListingPrice ?? 0),
      0,
    );
};
