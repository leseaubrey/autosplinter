import { baseConfig } from "@autosplinter/eslint-config/base";
import { reactConfig } from "@autosplinter/eslint-config/react";
import { defineConfig } from "eslint/config";

export default defineConfig(
  {
    ignores: [".expo/**", "expo-plugins/**"],
  },
  baseConfig,
  reactConfig,
);
