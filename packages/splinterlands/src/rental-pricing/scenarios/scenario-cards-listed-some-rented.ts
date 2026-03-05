import { Effect } from "effect";

import type { CardVariantGroup } from "@workspace/core";

import type { PriceLadder } from "../../price-ladder";
import {
  getHighestRentedCardPrice,
  hasCardsListedSomeRented,
  recommendPricesFromLadder,
} from "../../utils";

/**
 * This is the scenario where cards ares listed and some are rented out.
 */
export const handleCardsListedSomeRentedScenario = (
  group: CardVariantGroup,
  priceLadder: PriceLadder,
) => {
  return Effect.gen(function* () {
    if (!hasCardsListedSomeRented(group.cards)) {
      return yield* Effect.succeed([]);
    }

    const highestRentedCardPrice = getHighestRentedCardPrice(group.cards);

    const highestRentedCardPriceIndex = Math.max(
      0,
      priceLadder.findLastIndex((step) => step.price <= highestRentedCardPrice),
    );

    return recommendPricesFromLadder({
      cards: group.cards,
      priceLadder,
      startIndex: highestRentedCardPriceIndex,
      stepCount: 6,
    });
  });
};
