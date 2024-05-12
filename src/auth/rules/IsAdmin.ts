import { preExecRule } from "@graphql-authz/core";
import { Context } from "../../schema/context.js";

export const IsAdmin = preExecRule({
  error: "You must be an admin to access this resource.",
})((context: Context) => context.user.type === "ADMIN");
