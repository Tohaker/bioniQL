import { parse } from "graphql";
import { buildHTTPExecutor } from "@graphql-tools/executor-http";

import { yoga } from "../src/yoga";
import { startServer, stopServer } from "./utils/database";

function assertSingleValue<TValue extends object>(
  value: TValue | AsyncIterable<TValue>
): asserts value is TValue {
  if (Symbol.asyncIterator in value) {
    throw new Error("Expected single value");
  }
}

describe("Toa queries", () => {
  const executor = buildHTTPExecutor({
    fetch: yoga.fetch,
  });

  it("should return the correct toa when searching by name", async () => {
    const result = await executor({
      document: parse(/* GraphQL */ `
        query {
          toa(name: "Tahu") {
            name
          }
        }
      `),
    });

    assertSingleValue(result);

    expect(result.data.toa[0].name).toBe("Tahu");
  });
});
