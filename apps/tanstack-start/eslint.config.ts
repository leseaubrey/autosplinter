import { baseConfig, restrictEnvAccess } from "@workspace/eslint-config/base";
import { reactConfig } from "@workspace/eslint-config/react";
import { defineConfig } from "eslint/config";

export default defineConfig(
  {
    ignores: [".nitro/**", ".output/**", ".tanstack/**"],
  },
  baseConfig,
  reactConfig,
  restrictEnvAccess,
);
