import type { Schema } from "effect";

import type { CardInstance, MarketListing } from "@workspace/core";

import type {
  GetCardDetailsResponse,
  GetMarketQueryByCardResponse,
  GetPlayerCardCollectionResponse,
} from "./schema";

export const transformGetCardDetailsResponse = (
  response: Schema.Schema.Type<typeof GetCardDetailsResponse>,
) => {
  return response.map((card) => {
    return {
      id: card.id,
      name: card.name,
      rarity: card.rarity,
    };
  });
};

export const transformGetMarketQueryByCardResponse = (
  response: Schema.Schema.Type<typeof GetMarketQueryByCardResponse>,
) => {
  return response.map((listing) => {
    return {
      cardId: listing.uid,
      cardDetailId: listing.card_detail_id,
      gold: listing.gold,
      bcx: listing.bcx,
      marketListingPrice: listing.buy_price,
      marketListingType: listing.type,
    };
  }) satisfies MarketListing[];
};

export const transformGetPlayerCardCollectionResponse = (
  response: Schema.Schema.Type<typeof GetPlayerCardCollectionResponse>,
) => {
  return response.cards.map((card) => {
    return {
      player: card.player,
      cardId: card.uid,
      cardDetailId: card.card_detail_id,
      gold: card.gold,
      edition: card.edition,
      bcx: card.bcx,
      marketListingPrice: card.buy_price,
      marketListingType: card.market_listing_type,
      marketListingStatus: card.market_listing_status,
    };
  }) satisfies CardInstance[];
};
