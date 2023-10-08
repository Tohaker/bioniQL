import { createYoga } from "graphql-yoga";
import { schema } from "./schema";
import { context } from "./schema/context";

export const yoga = createYoga({ schema, context });
