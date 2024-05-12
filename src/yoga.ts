import "@total-typescript/ts-reset";

import { authZEnvelopPlugin } from "@graphql-authz/envelop-plugin";
import { createYoga } from "graphql-yoga";

import { schema } from "./schema/index.js";
import { context } from "./schema/context.js";
import { rules } from "./auth/rules/index.js";

export const yoga = createYoga({
  schema,
  context,
  plugins: [
    authZEnvelopPlugin({
      rules,
    }),
  ],
});
