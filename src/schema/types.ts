import { Context } from "./context.js";

export type SchemaTypes = {
  Context: Context;
  AuthScopes: {
    admin: boolean;
  };
};
