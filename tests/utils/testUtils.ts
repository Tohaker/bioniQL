import { buildHTTPExecutor } from "@graphql-tools/executor-http";

import { yoga } from "../../src/yoga.js";
import { ADMIN_ID } from "./constants.js";

export const executor = buildHTTPExecutor({
  fetch: yoga.fetch,
  headers: {
    "x-user-id": ADMIN_ID,
  },
});

export const createExecutor = (headers: Record<string, string>) =>
  buildHTTPExecutor({ fetch: yoga.fetch, headers });

export function assertSingleValue<TValue extends object>(
  value: TValue | AsyncIterable<TValue>
): asserts value is TValue {
  if (Symbol.asyncIterator in value) {
    throw new Error("Expected single value");
  }
}

export const assertCharacters = <T extends Array<any>>(
  characters?: T | null
): characters is T => {
  expect(characters).toBeDefined();
  expect(characters?.length).toBeGreaterThan(0);

  return true;
};
