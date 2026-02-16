import { Effect } from "effect";

import type { CardVariantGroup } from "@workspace/core";

import type { PurchaseRecommendation } from "../engine";
import { allAvailableCardsRented } from "../../utils";

/**
 * This is the scenario where all available cards are rented.
 */
export const handleAllAvailableCardsRentedScenario = (
  group: CardVariantGroup,
) => {
  return Effect.gen(function* () {
    if (!allAvailableCardsRented(group.cards)) {
      return yield* Effect.succeed([]);
    }

    return [
      {
        variant: group.variant,
        reason: "All available cards rented",
      },
    ] satisfies PurchaseRecommendation[];
  });
};
