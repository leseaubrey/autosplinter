import { Effect } from "effect";

import type { CardVariantGroup } from "@workspace/core";

import type { PriceLadder } from "../../price-ladder";
import {
  getHighestListedCardPrice,
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

    const highestListedPrice = getHighestListedCardPrice(group.cards);

    const highestListedPriceIndex = priceLadder.findIndex(
      (step) => step.price === highestListedPrice,
    );

    // Out of Bounds guard
    if (highestListedPriceIndex === -1) return [];

    return recommendPricesFromLadder({
      cards: group.cards,
      priceLadder,
      startIndex: highestListedPriceIndex,
      stepCount: 6,
    });
  });
};
