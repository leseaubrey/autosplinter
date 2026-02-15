import {
  FetchHttpClient,
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
} from "@effect/platform";
import { Effect } from "effect";

import { CardFoil, MarketListingType } from "@workspace/core";

import { SplinterlandsApiConfig } from "../config";
import {
  GetCardDetailsResponse,
  GetMarketQueryByCardResponse,
  GetPlayerCardCollectionResponse,
} from "./schema";

export class SplinterlandsApiClient extends Effect.Service<SplinterlandsApiClient>()(
  "SplinterlandsApiClient",
  {
    effect: Effect.gen(function* () {
      const defaultClient = yield* HttpClient.HttpClient;
      const config = yield* SplinterlandsApiConfig;

      const { apiBaseUrl } = config;

      const client = defaultClient.pipe(
        HttpClient.mapRequest(HttpClientRequest.prependUrl(apiBaseUrl)),
      );

      /**
       * @see https://api2.splinterlands.com/doc/#/default/get_cards_get_details
       */
      const getCardDetails = () => {
        return Effect.gen(function* () {
          const apiPath = "/cards/get_details";

          const request = HttpClientRequest.get(apiPath);

          const response = yield* client.execute(request);

          const parsedResponse = yield* HttpClientResponse.schemaBodyJson(
            GetCardDetailsResponse,
          )(response);

          return parsedResponse;
        });
      };

      /**
       * Documentation
       *
       * @see https://api2.splinterlands.com/doc/#/default/get_market_market_query_by_card
       */
      const getMarketQueryByCard = (input: {
        listingType: MarketListingType;
        cardDetailId: number;
        cardFoil?: CardFoil;
        cardLevel?: number;
      }) => {
        return Effect.gen(function* () {
          const { listingType, cardDetailId, cardFoil, cardLevel } = input;

          const paramMapping = {
            type: listingType,

            // This is an artifact of the previous option to rent daily
            ...(listingType === MarketListingType.Rent && {
              rental_type: "season",
            }),

            card_detail_id: cardDetailId,

            ...(cardFoil && {
              gold: cardFoil === CardFoil.Gold,
            }),

            ...(cardLevel && {
              level: cardLevel,
            }),
          };

          const apiPath = "/market/market_query_by_card";

          const request = HttpClientRequest.get(apiPath).pipe(
            HttpClientRequest.appendUrlParams(paramMapping),
          );

          const response = yield* client.execute(request);

          const parsedResponse = yield* HttpClientResponse.schemaBodyJson(
            GetMarketQueryByCardResponse,
          )(response);

          return parsedResponse;
        });
      };

      /**
       * Returns players card collection
       */
      const getPlayerCardCollection = (player: string) => {
        return Effect.gen(function* () {
          const apiPath = `/cards/collection/${player}`;

          const request = HttpClientRequest.get(apiPath);

          const response = yield* client.execute(request);

          const parsedResponse = yield* HttpClientResponse.schemaBodyJson(
            GetPlayerCardCollectionResponse,
          )(response);

          return parsedResponse;
        });
      };

      return { getCardDetails, getMarketQueryByCard, getPlayerCardCollection };
    }),

    dependencies: [FetchHttpClient.layer],
  },
) {}
