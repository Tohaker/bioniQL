import SchemaBuilder from "@pothos/core";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import { SchemaTypes } from "./types.js";
import { unauthorizedError } from "./auth/unauthorizedError.js";

export const builder = new SchemaBuilder<SchemaTypes>({
  defaults: 'v4',
  plugins: [ScopeAuthPlugin],
  scopeAuth: {
    unauthorizedError,
    authScopes: async (context) => ({
      admin: context.user.type === "ADMIN",
    }),
  },
});
