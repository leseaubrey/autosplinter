import { Effect } from "effect";

import type { CardVariantGroup } from "@workspace/core";

import type { PriceLadder } from "../../price-ladder";
import {
  getLowestListedCardPrice,
  hasCardsListedNoneRented,
  recommendPricesFromLadder,
} from "../../utils";

export const handleCardsListedNoneRentedScenario = (
  group: CardVariantGroup,
  priceLadder: PriceLadder,
) => {
  return Effect.gen(function* () {
    if (!hasCardsListedNoneRented(group.cards)) {
      return yield* Effect.succeed([]);
    }

    const lowestListedPrice = getLowestListedCardPrice(group.cards);

    // Start recommendations at the first step below the lowest listed price
    const lowestListedPriceIndex = Math.max(
      0,
      priceLadder.findIndex((step) => step.price === lowestListedPrice) - 1,
    );

    return recommendPricesFromLadder({
      cards: group.cards,
      priceLadder,
      startIndex: lowestListedPriceIndex,
      stepCount: 6,
    });
  });
};
