import "@total-typescript/ts-reset";

import { createYoga } from "graphql-yoga";

import { schema } from "./schema/index.js";
import { context } from "./schema/context.js";

export const yoga = createYoga({
  schema,
  context,
});
