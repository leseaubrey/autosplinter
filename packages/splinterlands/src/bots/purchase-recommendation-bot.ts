import { Effect } from "effect";

import type { PurchaseRecommendation } from "../rental-price-analysis";
import { SplinterlandsApiService } from "../api";
import { getPriceAnalysisForGroup } from "../rental-price-analysis";

export const purchaseRecommendationBot = (input: { player: string }) => {
  return Effect.gen(function* () {
    const { player } = input;

    const apiService = yield* SplinterlandsApiService;

    const cardGroups = yield* apiService.getGroupedPlayerCards(player);

    const purchaseRecommendations: PurchaseRecommendation[] = [];

    // Process each group sequentially.
    for (const cardGroup of cardGroups) {
      const recommendations = yield* getPriceAnalysisForGroup(cardGroup);

      if (recommendations.length > 0) {
        purchaseRecommendations.push(...recommendations);
      }
    }

    return purchaseRecommendations;
  });
};
