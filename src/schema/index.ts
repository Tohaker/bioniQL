import { builder } from "./builder";
import "./objects";
import "./queries";

builder.queryType({});

export const schema = builder.toSchema();
