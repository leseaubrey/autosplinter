import { Schema } from "effect";

import {
  CardRarity,
  MarketListingStatus,
  MarketListingType,
} from "@workspace/core";

const CardRaritySchema = Schema.transform(
  Schema.Literal(1, 2, 3, 4),
  Schema.Enums(CardRarity),
  {
    decode: (value) => {
      switch (value) {
        case 1:
          return CardRarity.Common;
        case 2:
          return CardRarity.Rare;
        case 3:
          return CardRarity.Epic;
        case 4:
          return CardRarity.Legendary;
      }
    },
    encode: (value) => {
      switch (value) {
        case CardRarity.Common:
          return 1;
        case CardRarity.Rare:
          return 2;
        case CardRarity.Epic:
          return 3;
        case CardRarity.Legendary:
          return 4;
      }
    },
  },
);

const MarketListingStatusSchema = Schema.transform(
  Schema.Literal(0, 3),
  Schema.Enums(MarketListingStatus),
  {
    decode: (value) => {
      switch (value) {
        case 0:
          return MarketListingStatus.Listed;

        case 3:
          return MarketListingStatus.Rented;
      }
    },
    encode: (value) => {
      switch (value) {
        case MarketListingStatus.Listed:
          return 0;
        case MarketListingStatus.Rented:
          return 3;
      }
    },
  },
);

/**
 * Get Card Details Response
 */

export const GetCardDetailsSuccessResponse = Schema.Array(
  Schema.Struct({
    id: Schema.Number,
    name: Schema.String,
    rarity: CardRaritySchema,
  }),
);

export const GetCardDetailsResponse = Schema.Union(
  GetCardDetailsSuccessResponse,
);

export type GetCardDetailsResponse = Schema.Schema.Type<
  typeof GetCardDetailsResponse
>;

/**
 * Get Market Query By Card Response
 */
export const GetMarketQueryByCardSuccessResponse = Schema.Array(
  Schema.Struct({
    uid: Schema.String,
    buy_price: Schema.Number, // Buy price refers to sell or rent price in DEC
    bcx: Schema.Number,
    type: Schema.Enums(MarketListingType),
    gold: Schema.Boolean,
    card_detail_id: Schema.Number,
  }),
);

export const GetMarketQueryByCardResponse = Schema.Union(
  GetMarketQueryByCardSuccessResponse,
);

export type GetMarketQueryByCardResponse = Schema.Schema.Type<
  typeof GetMarketQueryByCardResponse
>;

/**
 * Get Player Card Collection Response
 */
export const GetPlayerCardCollectionSuccessResponse = Schema.Struct({
  cards: Schema.Array(
    Schema.Struct({
      player: Schema.String,
      uid: Schema.String,
      card_detail_id: Schema.Number,
      gold: Schema.Boolean,
      // TODO: Transform edition to Human Readable String
      edition: Schema.Number,
      buy_price: Schema.NullOr(Schema.NumberFromString),
      market_listing_type: Schema.NullOr(Schema.Enums(MarketListingType)),
      market_listing_status: Schema.NullOr(MarketListingStatusSchema),
      bcx: Schema.Number,
    }),
  ),
});

export const GetPlayerCardCollectionResponse = Schema.Union(
  GetPlayerCardCollectionSuccessResponse,
);

export type GetPlayerCardCollectionResponse = Schema.Schema.Type<
  typeof GetPlayerCardCollectionResponse
>;
