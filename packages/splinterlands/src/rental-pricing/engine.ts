import { Effect } from "effect";

import type { CardVariantGroup } from "@workspace/core";

import type { PriceLadder } from "../price-ladder";
import {
  handleAllListedCardsRentedScenario,
  handleNoCardsListedScenario,
} from "./scenarios";

export interface RentalPriceRecommendation {
  cardId: string;
  price: number;
}

const scenarioHandlers = [
  handleNoCardsListedScenario,
  handleAllListedCardsRentedScenario,
];

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
