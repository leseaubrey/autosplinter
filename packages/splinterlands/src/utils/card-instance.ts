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

/**
 * Checks if all available cards are rented.
 */
export const allAvailableCardsRented = (cards: CardInstance[]) => {
  return cards.every(
    (card) => card.marketListingStatus === MarketListingStatus.Rented,
  );
};

/**
 * Checks if there are any cards listed at a specific price.
 */
export const hasListedCardAtPrice = (cards: CardInstance[], price: number) => {
  return cards.some(
    (card) =>
      card.marketListingPrice === price &&
      card.marketListingStatus === MarketListingStatus.Listed,
  );
};

/**
 * Checks if there are any cards listed for rent but no cards rented out.
 */
export const hasCardsListedNoneRented = (cards: CardInstance[]) => {
  const listedCards = cards.filter(
    (card) => card.marketListingStatus === MarketListingStatus.Listed,
  );

  const rentedCards = cards.filter(
    (card) => card.marketListingStatus === MarketListingStatus.Rented,
  );

  return listedCards.length > 0 && rentedCards.length === 0;
};

/**
 * Get the highest listed card price.
 */
export const getHighestListedCardPrice = (cards: CardInstance[]) => {
  return cards
    .filter((card) => card.marketListingStatus === MarketListingStatus.Listed)
    .reduce(
      (maxPrice, card) => Math.max(maxPrice, card.marketListingPrice ?? 0),
      0,
    );
};

/**
 * Checks if there are cards listed for rent and at least some of them are rented out.
 */
export const hasCardsListedSomeRented = (cards: CardInstance[]) => {
  const listedCards = cards.filter(
    (card) => card.marketListingStatus === MarketListingStatus.Listed,
  );

  const rentedCards = cards.filter(
    (card) => card.marketListingStatus === MarketListingStatus.Rented,
  );

  return listedCards.length > 0 && rentedCards.length > 0;
};
