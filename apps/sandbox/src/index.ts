import { SplinterlandsApiClient } from "@workspace/splinterlands";
import { Effect } from "effect";

import { RuntimeServer } from "./runtime-server";

const program = Effect.gen(function* () {
  const api = yield* SplinterlandsApiClient;

  const response = yield* api.getCardDetails();

  return response;
});

RuntimeServer.runPromise(program).then((r) => {
  console.log(r);
});
