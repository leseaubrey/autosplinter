import { Schema } from "effect";

import { CardRarity } from "@workspace/core";

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
