import { Effect } from "effect";

import type { CardFoil, CardVariant, CardVariantGroup } from "@workspace/core";
import { MarketListingType } from "@workspace/core";

import { SplinterlandsApiClient } from "./client";

export class SplinterlandsApiService extends Effect.Service<SplinterlandsApiService>()(
  "SplinterlandsApiService",
  {
    effect: Effect.gen(function* () {
      const client = yield* SplinterlandsApiClient;

      const getGroupedPlayerCards = (player: string) => {
        return Effect.gen(function* () {
          // Create a map of card details for quick lookup
          const cards = yield* client.getCardDetails();
          const cardDetailsMap = new Map(cards.map((card) => [card.id, card]));

          // Create a map for grouping card instances by variant
          const variantGroupsMap = new Map<string, CardVariantGroup>();

          const playerCards = yield* client.getPlayerCardCollection(player);

          // Group card instances by their variant
          for (const cardInstance of playerCards) {
            const cardDetails = cardDetailsMap.get(cardInstance.cardDetailId);

            // Skip if card details don't exist (shouldn't happen in practice)
            if (!cardDetails) {
              // TODO: Log warning or handle missing card details
              continue;
            }

            // Define the variant that groups identical cards
            const variant: CardVariant = {
              cardDetailId: cardInstance.cardDetailId,
              bcx: cardInstance.bcx,
              gold: cardInstance.gold,
              edition: cardInstance.edition,
              rarity: cardDetails.rarity,
            };

            // Create a unique key for grouping based on variant properties
            const variantKey = `${variant.cardDetailId}-${variant.bcx}-${variant.gold}-${variant.edition}`;

            // Create group if it doesn't exist
            if (!variantGroupsMap.has(variantKey)) {
              variantGroupsMap.set(variantKey, {
                variant,
                cards: [],
              });
            }

            const group = variantGroupsMap.get(variantKey);
            if (group) {
              group.cards.push(cardInstance);
            }
          }

          return Array.from(variantGroupsMap.values());
        });
      };

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

      return { getGroupedPlayerCards, getCardLowestRentalPrice };
    }),

    dependencies: [SplinterlandsApiClient.Default],
  },
) {}
