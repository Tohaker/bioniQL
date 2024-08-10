import {
  AuthScopeFailureType,
  UnauthorizedForTypeErrorFn,
} from "@pothos/plugin-scope-auth";
import { GraphQLErrorOptions, GraphQLError } from "graphql";
import { SchemaTypes } from "../types.js";

export const unauthorizedError: UnauthorizedForTypeErrorFn<
  PothosSchemaTypes.ExtendDefaultTypes<SchemaTypes>,
  {}
> = (_, __, ___, { failure, message }) => {
  const options: GraphQLErrorOptions = {
    extensions: {
      code: "FORBIDDEN",
    },
  };

  if (failure.kind === AuthScopeFailureType.AnyAuthScopes) {
    const scopes = failure.failures.reduce<string[]>((acc, f) => {
      if (f.kind === AuthScopeFailureType.AuthScope) {
        return acc.concat(f.scope);
      } else {
        return acc;
      }
    }, []);

    return new GraphQLError(
      `${message}. Must have ${scopes.join(", ")} scope${
        scopes.length > 1 ? "s" : ""
      }`,
      options
    );
  }

  return new GraphQLError(message, options);
};
