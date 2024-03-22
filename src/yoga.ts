import "@total-typescript/ts-reset";

import { createYoga } from "graphql-yoga";
import { schema } from "./schema";
import { context } from "./schema/context";
import { authZEnvelopPlugin } from "@graphql-authz/envelop-plugin";
import { rules } from "./auth/rules";

export const yoga = createYoga({
  schema,
  context,
  plugins: [
    authZEnvelopPlugin({
      rules,
    }),
  ],
});
