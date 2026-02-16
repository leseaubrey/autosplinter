import { Effect } from "effect";

import type { CardVariant, CardVariantGroup } from "@workspace/core";

import { handleAllAvailableCardsRentedScenario } from "./scenarios";

export interface PurchaseRecommendation {
  variant: CardVariant;
  reason: string;
}

const scenarioHandlers = [handleAllAvailableCardsRentedScenario];

export const getPriceAnalysisForGroup = (cardGroup: CardVariantGroup) => {
  return Effect.gen(function* () {
    for (const handleScenario of scenarioHandlers) {
      const recommendations = yield* handleScenario(cardGroup);

      // Stop on first matching scenario.
      if (recommendations.length > 0) {
        return recommendations;
      }
    }

    return [];
  });
};
