import SchemaBuilder from "@pothos/core";
import { Context } from "./context";
import AuthzPlugin from "@pothos/plugin-authz";
import { rules } from "../auth/rules";

export const builder = new SchemaBuilder<{
  Context: Context;
  AuthZRule: keyof typeof rules;
}>({
  plugins: [AuthzPlugin],
});
