import { Client, PrivateKey } from "@hiveio/dhive";
import { Effect } from "effect";

export interface BlockchainOperation {
  id: string;
  json: string;
  required_auths: string[];
  required_posting_auths: string[];
}

export interface BlockchainTransactionConfirmation {
  id: string;
  block_num: number;
  trx_num: number;
  expired: boolean;
}

export class HiveBlockchainClient extends Effect.Service<HiveBlockchainClient>()(
  "HiveBlockchainClient",
  {
    effect: Effect.sync(() => {
      const client = new Client([
        "https://api.hive.blog",
        "https://api.hivekings.com",
        "https://anyx.io",
        "https://api.openhive.network",
      ]);

      const broadcastOperation = (
        operation: BlockchainOperation,
        keyString: string,
        errMsg: string,
      ) => {
        const privateKey = PrivateKey.fromString(keyString);

        return Effect.tryPromise({
          // TODO: Review other possible solutions
          // Explicitly declare the return type of the hive client method to resolve TS2742
          // The inferred type cannot be named without a reference to @hiveio/dhive
          try: (): Promise<BlockchainTransactionConfirmation> => {
            return client.broadcast.json(operation, privateKey);
          },
          // TODO: Effect error handling
          catch: (error) => {
            if (error instanceof Error) {
              return new Error(`${errMsg} - ${error.message}`);
            }

            return new Error(`${errMsg} - ${JSON.stringify(error)}`);
          },
        });
      };

      return { broadcastOperation };
    }),

    dependencies: [],
  },
) {}
