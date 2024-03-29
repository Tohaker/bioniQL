import { type CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/schema/index.ts",
  documents: ["tests/**/*.test.ts"],
  require: ["ts-node/register"],
  generates: {
    "./tests/gql/": {
      preset: "client-preset",
    },
    "./schema.graphql": {
      plugins: ["schema-ast"],
    },
  },
};

export default config;
