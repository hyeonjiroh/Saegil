import type { Configuration } from "webpack";
import type { WebpackConfigContext } from "next/dist/server/config-shared";

const nextConfig = {
  webpack(config: Configuration, context: WebpackConfigContext): Configuration {
    const rules = config.module?.rules;

    if (Array.isArray(rules)) {
      const fileLoaderRule = rules.find(
        (rule): rule is { [key: string]: any } =>
          typeof rule === "object" &&
          rule !== null &&
          "test" in rule &&
          rule.test instanceof RegExp &&
          rule.test.test(".svg")
      );

      if (fileLoaderRule) {
        fileLoaderRule.exclude = /\.svg$/i;
      }
    }

    config.module?.rules?.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
