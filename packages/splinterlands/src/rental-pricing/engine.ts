import { Effect } from "effect";

import type { CardVariantGroup } from "@workspace/core";

import type { PriceLadder } from "../price-ladder";
import { handleNoCardsListedScenario } from "./scenario-no-cards-listed";

export interface RentalPriceRecommendation {
  cardId: string;
  price: number;
}

const scenarioHandlers = [handleNoCardsListedScenario];

export const getRentalPriceRecommendationsForGroup = (
  cardGroup: CardVariantGroup,
  priceLadder: PriceLadder,
) => {
  return Effect.gen(function* () {
    for (const handleScenario of scenarioHandlers) {
      const recommendations = yield* handleScenario(cardGroup, priceLadder);

      // Stop on first matching scenario.
      if (recommendations.length > 0) {
        return recommendations;
      }
    }

    return [] satisfies RentalPriceRecommendation[];
  });
};
