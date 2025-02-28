import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import jsonServer from "json-server";

import { yoga } from "./yoga.js";
// @ts-expect-error no types for database
import database from "../data/db.cjs";

const server = jsonServer.create();
const router = jsonServer.router(database());
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});

export const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  const response = await yoga.fetch(
    event.path,
    {
      method: event.httpMethod,
      headers: event.headers,
      body: event.body,
    },
    {
      event,
      context,
    }
  );

  const responseHeaders = Object.fromEntries(response.headers.entries());

  return {
    statusCode: response.status,
    headers: responseHeaders,
    body: await response.text(),
    isBase64Encoded: false,
  };
};
