import { builder } from "./builder";
import "./objects";

builder.queryType({});

export const schema = builder.toSchema();
