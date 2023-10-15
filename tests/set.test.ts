import { graphql } from "./gql";
import { executor, assertSingleValue } from "./utils/testUtils";

describe("Set queries", () => {
  it("should return a set by id", async () => {
    const result = await executor({
      document: graphql(/* GraphQL */ `
        query GetSet {
          set(id: "8534") {
            id
            year
            pieces
            instructions
          }
        }
      `),
    });

    assertSingleValue(result);

    const set = result.data?.set;

    expect(set?.id).toBe("8534");
    expect(set?.year).toBe(2001);
    expect(set?.pieces).toBe(33);
    expect(set?.instructions).toBe(
      "https://www.lego.com/service/buildinginstructions/8534"
    );
  });
});
