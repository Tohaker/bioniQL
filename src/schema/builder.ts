import SchemaBuilder from "@pothos/core";
import AuthzPlugin from "@pothos/plugin-authz";

import { Context } from "./context.js";
import { rules } from "../auth/rules/index.js";

export const builder = new SchemaBuilder<{
  Context: Context;
  AuthZRule: keyof typeof rules;
}>({
  plugins: [AuthzPlugin],
});
