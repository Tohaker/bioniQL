import { builder } from "./builder";
import "./objects";
import "./queries";
import "./mutations";

builder.queryType({});
builder.mutationType({});

export const schema = builder.toSchema();
