import { type CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/schema/index.ts",
  require: ["ts-node/register"],
  generates: {
    "./schema.graphql": {
      plugins: ["schema-ast"],
    },
  },
};

export default config;
