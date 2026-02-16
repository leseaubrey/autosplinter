import { Effect } from "effect";

import type { CardFoil } from "@workspace/core";
import { MarketListingType } from "@workspace/core";

import { SplinterlandsApiClient } from "./client";

export class SplinterlandsApiService extends Effect.Service<SplinterlandsApiService>()(
  "SplinterlandsApiService",
  {
    effect: Effect.gen(function* () {
      const client = yield* SplinterlandsApiClient;

      const getCardLowestRentalPrice = (input: {
        cardDetailId: number;
        cardFoil: CardFoil;
        cardLevel: number;
      }) => {
        return Effect.gen(function* () {
          const { cardDetailId, cardFoil, cardLevel } = input;

          const listings = yield* client.getMarketQueryByCard({
            listingType: MarketListingType.Rent,
            cardDetailId,
            cardFoil,
            cardLevel,
          });

          if (listings.length === 0) {
            return 0;
          }

          const prices = listings.map((listing) => listing.marketListingPrice);

          prices.sort((a, b) => a - b);

          return prices[0] ?? 0;
        });
      };

      return { getCardLowestRentalPrice };
    }),

    dependencies: [SplinterlandsApiClient.Default],
  },
) {}
