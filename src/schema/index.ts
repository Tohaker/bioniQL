import { builder } from "./builder.js";
import "./objects/index.js";
import "./queries/index.js";
import "./mutations/index.js";

builder.queryType({});
builder.mutationType({});

export const schema = builder.toSchema();
