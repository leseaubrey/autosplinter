import { Effect } from "effect";

import type { CardVariantGroup } from "@workspace/core";
import { CardFoil } from "@workspace/core";

import type { PriceLadder } from "../price-ladder";
import { SplinterlandsApiService } from "../api";
import {
  allCardsAreUnlisted,
  calculateCardLevel,
  findStepIndexAtOrBelow,
  getUnlistedCards,
} from "../utils";

/**
 * This is the scenario when no cards are listed.
 */
export const handleNoCardsListedScenario = (
  group: CardVariantGroup,
  priceLadder: PriceLadder,
) => {
  return Effect.gen(function* () {
    if (!allCardsAreUnlisted(group.cards)) {
      return yield* Effect.succeed([]);
    }

    const apiService = yield* SplinterlandsApiService;

    const lowestRentalPrice = yield* apiService.getCardLowestRentalPrice({
      cardDetailId: group.variant.cardDetailId,
      // TODO: Better handle foil types
      cardFoil: group.variant.gold ? CardFoil.Gold : CardFoil.Regular,
      cardLevel: calculateCardLevel(group.variant),
    });

    const startIndex = findStepIndexAtOrBelow(lowestRentalPrice, priceLadder);

    const step = priceLadder[startIndex];

    // Bail if the step is not defined
    if (!step) {
      return [];
    }

    const unlistedCards = getUnlistedCards(group.cards);

    const cardToList = unlistedCards.pop();

    // Bail if no card to list
    if (!cardToList) {
      return [];
    }

    return [
      {
        price: step.price,
        cardId: cardToList.cardId,
      },
    ];
  });
};
