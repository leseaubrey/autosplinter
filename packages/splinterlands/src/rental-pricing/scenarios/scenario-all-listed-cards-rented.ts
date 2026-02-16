import { Effect } from "effect";

import type { CardVariantGroup } from "@workspace/core";

import type { PriceLadder } from "../../price-ladder";
import {
  allListedCardsRented,
  getHighestRentedCardPrice,
  getUnlistedCards,
} from "../../utils";

/**
 * This is the scenario where all listed cards are rented.
 */
export const handleAllListedCardsRentedScenario = (
  group: CardVariantGroup,
  priceLadder: PriceLadder,
) => {
  return Effect.gen(function* () {
    if (!allListedCardsRented(group.cards)) {
      return yield* Effect.succeed([]);
    }

    const highestRentedCardPrice = getHighestRentedCardPrice(group.cards);

    // TODO: Review
    const highestRentedCardPriceIndex = priceLadder.findIndex(
      (step) => step.price > highestRentedCardPrice,
    );

    const step = priceLadder[highestRentedCardPriceIndex];

    // Bail if the step is not defined
    if (!step) {
      return [];
    }

    const unlistedCards = getUnlistedCards(group.cards);

    const cardToList = unlistedCards.pop();

    // Bail if no card to list
    if (!cardToList) {
      return [];
    }

    return [
      {
        price: step.price,
        cardId: cardToList.cardId,
      },
    ];
  });
};
