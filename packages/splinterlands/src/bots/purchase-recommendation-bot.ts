import { Effect } from "effect";

import type { PurchaseRecommendation } from "../rental-price-analysis";
import { SplinterlandsApiService } from "../api";
import { getPriceAnalysisForGroup } from "../rental-price-analysis";

const minDelayMs = 1200;
const jitterMs = 300;

const getPacingDelayMs = () => {
  return minDelayMs + Math.floor(Math.random() * (jitterMs + 1));
};

export const purchaseRecommendationBot = (input: { player: string }) => {
  return Effect.gen(function* () {
    const { player } = input;

    const apiService = yield* SplinterlandsApiService;

    const cardGroups = yield* apiService.getGroupedPlayerCards(player);

    const purchaseRecommendations: PurchaseRecommendation[] = [];

    // Process each group sequentially.
    for (const cardGroup of cardGroups) {
      const recommendations = yield* getPriceAnalysisForGroup(cardGroup);

      // Prevents further scenarios from being applied, currently our scenarios are mutually exclusive however this may not be the case in future
      if (recommendations.length > 0) {
        purchaseRecommendations.push(...recommendations);
        break;
      }

      // Add pacing between to reduce rate-limit risk.
      yield* Effect.sleep(`${getPacingDelayMs()} millis`);
    }

    return purchaseRecommendations;
  });
};
