import { Config } from "effect";

export const SplinterlandsApiConfig = Config.all({
  apiBaseUrl: Config.string("SPLINTERLANDS_API_BASE_URL"),
});
