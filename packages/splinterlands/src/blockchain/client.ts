import { Effect } from "effect";

import { Currency } from "@workspace/core";
import { HiveBlockchainClient } from "@workspace/hive";

export class SplinterlandsBlockchainClient extends Effect.Service<SplinterlandsBlockchainClient>()(
  "SplinterlandsBlockchainClient",
  {
    effect: Effect.gen(function* () {
      const blockchainClient = yield* HiveBlockchainClient;

      const listCardsForRent = (input: {
        cards: [string, number][];
        username: string;
        postingKey: string;
      }) => {
        return Effect.gen(function* () {
          const { cards, username, postingKey } = input;

          const operation = {
            id: "sm_market_list",
            json: JSON.stringify({
              cards,
              type: "season",
              fee: 500,
              list_fee: cards.length, // The list fee is 1 DEC per card
              list_fee_token: Currency.DEC,
            }),
            required_auths: [],
            required_posting_auths: [username],
          };

          return yield* blockchainClient.broadcastOperation(
            operation,
            postingKey,
            "Failed to list cards for rent",
          );
        });
      };

      return { listCardsForRent };
    }),

    dependencies: [HiveBlockchainClient.Default],
  },
) {}
