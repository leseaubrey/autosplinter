import { Effect } from "effect";

import type { PriceLadder } from "../price-ladder";
import { SplinterlandsApiService } from "../api";
import { SplinterlandsBlockchainClient } from "../blockchain";
import { getRentalPriceRecommendationsForGroup } from "../rental-pricing";
import { cardsGroupIsValidForRental } from "../utils";

// TODO: B
const minDelayMs = 1200;
const jitterMs = 300;
const listingBatchSize = 10;

const getPacingDelayMs = () => {
  return minDelayMs + Math.floor(Math.random() * (jitterMs + 1));
};

export const cardRentalListingBot = (input: {
  player: string;
  postingKey: string;
  priceLadder: PriceLadder;
}) => {
  return Effect.gen(function* () {
    const { player, postingKey, priceLadder } = input;

    const apiService = yield* SplinterlandsApiService;
    const blockchainClient = yield* SplinterlandsBlockchainClient;

    const cardGroups = yield* apiService.getGroupedPlayerCards(player);

    const pendingBatch: [string, number][] = [];
    const processedListings: [string, number][] = [];

    const listBatch = function* (cards: [string, number][]) {
      yield* blockchainClient.listCardsForRent({
        cards,
        username: player,
        postingKey,
      });

      processedListings.push(...cards);
    };

    // Process each group sequentially.
    for (const cardGroup of cardGroups) {
      if (!cardsGroupIsValidForRental(cardGroup)) {
        continue;
      }

      const recommendations = yield* getRentalPriceRecommendationsForGroup(
        cardGroup,
        priceLadder,
      );

      if (recommendations.length === 0) {
        continue;
      }

      const listings = recommendations.map(({ cardId, price }) => [
        cardId,
        price,
      ]) satisfies [string, number][];

      pendingBatch.push(...listings);

      while (pendingBatch.length >= listingBatchSize) {
        const batch = pendingBatch.splice(0, listingBatchSize);
        yield* listBatch(batch);
      }

      // Add pacing between to reduce rate-limit risk.
      yield* Effect.sleep(`${getPacingDelayMs()} millis`);
    }

    if (pendingBatch.length > 0) {
      yield* listBatch(pendingBatch.splice(0, pendingBatch.length));
    }

    return processedListings;
  });
};
