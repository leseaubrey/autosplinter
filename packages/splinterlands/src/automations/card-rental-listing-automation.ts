import { Effect } from "effect";

import type { PriceLadder } from "../price-ladder";
import { SplinterlandsBlockchainClient } from "../blockchain";
import { rentalPricingEngine } from "../rental-pricing";
import { chunkArray } from "../utils";

export const cardRentalListingAutomation = (input: {
  player: string;
  postingKey: string;
  priceLadder: PriceLadder;
  batchSize: number;
}) => {
  return Effect.gen(function* () {
    const { player, postingKey, priceLadder, batchSize } = input;

    const client = yield* SplinterlandsBlockchainClient;

    const recommendations = yield* rentalPricingEngine(player, priceLadder);

    const listings = recommendations.map(({ cardId, price }) => [
      cardId,
      price,
    ]) satisfies [string, number][];

    const batches = chunkArray(listings, batchSize);

    const processedListings = [];

    // Process each batch sequentially
    for (const batch of batches) {
      // Broadcast the batch of listings to the blockchain client
      yield* client.listCardsForRent({
        cards: batch,
        username: player,
        postingKey,
      });

      processedListings.push(...batch);
    }

    return processedListings;
  });
};
