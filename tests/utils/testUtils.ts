import { buildHTTPExecutor } from "@graphql-tools/executor-http";

import { yoga } from "../../src/yoga";

export const executor = buildHTTPExecutor({
  fetch: yoga.fetch,
});

export function assertSingleValue<TValue extends object>(
  value: TValue | AsyncIterable<TValue>
): asserts value is TValue {
  if (Symbol.asyncIterator in value) {
    throw new Error("Expected single value");
  }
}
