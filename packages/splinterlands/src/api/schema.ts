import { Schema } from "effect";

/**
 * Get Card Details Response
 */

export const GetCardDetailsSuccessResponse = Schema.Array(
  Schema.Struct({
    id: Schema.Number,
    name: Schema.String,
    rarity: Schema.Number,
  }),
);

export const GetCardDetailsResponse = Schema.Union(
  GetCardDetailsSuccessResponse,
);

export type GetCardDetailsResponse = Schema.Schema.Type<
  typeof GetCardDetailsResponse
>;
