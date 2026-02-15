import {
  baseConfig,
  restrictEnvAccess,
} from "@autosplinter/eslint-config/base";
import { nextjsConfig } from "@autosplinter/eslint-config/nextjs";
import { reactConfig } from "@autosplinter/eslint-config/react";
import { defineConfig } from "eslint/config";

export default defineConfig(
  {
    ignores: [".next/**"],
  },
  baseConfig,
  reactConfig,
  nextjsConfig,
  restrictEnvAccess,
);
