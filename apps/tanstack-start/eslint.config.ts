import {
  baseConfig,
  restrictEnvAccess,
} from "@autosplinter/eslint-config/base";
import { reactConfig } from "@autosplinter/eslint-config/react";
import { defineConfig } from "eslint/config";

export default defineConfig(
  {
    ignores: [".nitro/**", ".output/**", ".tanstack/**"],
  },
  baseConfig,
  reactConfig,
  restrictEnvAccess,
);
