import { SplinterlandsApiClient } from "@workspace/splinterlands";
import { Layer, ManagedRuntime } from "effect";

const MainLayer = Layer.mergeAll(SplinterlandsApiClient.Default);

export const RuntimeServer = ManagedRuntime.make(MainLayer);
