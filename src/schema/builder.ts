import SchemaBuilder from "@pothos/core";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";

import { Context } from "./context.js";

export const builder = new SchemaBuilder<{
  Context: Context;
  AuthScopes: {
    admin: boolean;
  };
}>({
  plugins: [ScopeAuthPlugin],
  scopeAuth: {
    authScopes: async (context) => ({
      admin: context.user.type === "ADMIN",
    }),
  },
});
