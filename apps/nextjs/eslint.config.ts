import { baseConfig, restrictEnvAccess } from "@workspace/eslint-config/base";
import { nextjsConfig } from "@workspace/eslint-config/nextjs";
import { reactConfig } from "@workspace/eslint-config/react";
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
