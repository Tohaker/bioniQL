# Authorization

Certain mutations will require admin authorization. This is to demonstrate the implementation of authorization in a GraphQL server using the [GraphQL AuthZ](https://github.com/AstrumU/graphql-authz) package and the [corresponding plugin](https://pothos-graphql.dev/docs/plugins/authz) for Pothos.

## Authenticating as an Admin

The Admin user ID needs to be passed on the `x-user-id` header on the request. To find the value of this ID, check the [Database file](../data//db.js) under the `users` field.

## Default to Guest

If you don't need to be an admin, omitting the `x-user-id` header will default you to the Guest user.
