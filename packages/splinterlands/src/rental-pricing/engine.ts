import { Effect } from "effect";

import type { PriceLadder } from "../price-ladder";
import { SplinterlandsApiService } from "../api";
import { cardsGroupIsValidForRental } from "../utils";
import { handleNoCardsListedScenario } from "./scenario-no-cards-listed";

export const rentalPricingEngine = (
  player: string,
  priceLadder: PriceLadder,
) => {
  return Effect.gen(function* () {
    const apiService = yield* SplinterlandsApiService;

    const cardGroups = yield* apiService.getGroupedPlayerCards(player);

    const validCardGroups = cardGroups.filter((cardGroup) =>
      cardsGroupIsValidForRental(cardGroup),
    );

    const priceRecommendations = [];

    // List of scenario handlers
    const scenarioHandlers = [handleNoCardsListedScenario];

    // Process each card group and apply all scenarios
    for (const cardGroup of validCardGroups) {
      for (const handleScenario of scenarioHandlers) {
        const recommendations = yield* handleScenario(cardGroup, priceLadder);

        // Prevents further scenarios from being applied, currently our scenarios are mutually exclusive however this may not be the case in future
        if (recommendations.length > 0) {
          priceRecommendations.push(...recommendations);

          break;
        }
      }
    }

    return priceRecommendations;
  });
};
