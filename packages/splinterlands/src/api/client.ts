import {
  FetchHttpClient,
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
} from "@effect/platform";
import { Effect } from "effect";

import { SplinterlandsApiConfig } from "../config";
import {
  GetCardDetailsResponse,
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

      return { getCardDetails, getPlayerCardCollection };
    }),

    dependencies: [FetchHttpClient.layer],
  },
) {}
