import type { CardInstance } from "@workspace/core";

import type { PriceLadder } from "../price-ladder";
import type { RentalPriceRecommendation } from "../rental-pricing";
import { getUnlistedCards, hasListedCardAtPrice } from "./card-instance";

/**
 * Returns the index of the ladder step on or below the target price. Otherwise returns 0.
 */
export const findStepIndexAtOrBelow = (
  targetPrice: number,
  ladder: PriceLadder,
): number => {
  if (ladder.length === 0) {
    return 0;
  }

  const filteredLadder = ladder.filter((step) => step.price <= targetPrice);

  return filteredLadder.length > 0 ? filteredLadder.length - 1 : 0;
};

// Currently setup to only produce a single recommendation at a time.
export const recommendPricesFromLadder = ({
  cards,
  priceLadder,
  startIndex,
  stepCount,
}: {
  cards: CardInstance[];
  priceLadder: PriceLadder;
  startIndex: number;
  stepCount: number;
}) => {
  const recommendations: RentalPriceRecommendation[] = [];

  const unlistedCards = getUnlistedCards(cards);

  // Bail if no unlisted cards
  if (unlistedCards.length === 0) {
    return recommendations;
  }

  // Calculate the maximum number of steps we can iterate
  const iterations = Math.min(stepCount, unlistedCards.length);

  for (let i = 0; i < iterations; i++) {
    const index = startIndex - i;

    // Exit if index is out of bounds to avoid extra iterations
    if (index < 0 || index >= priceLadder.length) {
      break;
    }

    const step = priceLadder[index];

    // Skip this iteration if the step is not defined
    if (!step) {
      continue;
    }

    // We only want to rent cards at steps that have no listed cards at this price.
    // If cards are already rented then that's ok, we want to fill steps on the ladder that are fully rented out
    if (hasListedCardAtPrice(cards, step.price)) {
      continue;
    }

    const cardToList = unlistedCards.pop();

    if (cardToList) {
      recommendations.push({
        price: step.price,
        cardId: cardToList.cardId,
      });

      // Stop further iterations once a recommendation is found
      break;
    }
  }

  return recommendations;
};
