import { preExecRule } from "@graphql-authz/core";
import { Context } from "../../schema/context";

export const IsAdmin = preExecRule({
  error: "You must be an admin to access this resource.",
})((context: Context) => context.user.type === "ADMIN");
