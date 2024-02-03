import { graphql } from "./gql";
import { executor, assertSingleValue } from "./utils/testUtils";

describe("Toa queries", () => {
  it("should return the correct toa when searching by name", async () => {
    const result = await executor({
      document: graphql(/* GraphQL */ `
        query GetToaTahu {
          toa(name: "Tahu") {
            id
            name
            element
          }
        }
      `),
    });

    assertSingleValue(result);

    const toa = result.data?.toa?.[0];

    expect(toa?.name).toBe("Tahu");
    expect(toa?.id).toBe("8534");
    expect(toa?.element).toBe("FIRE");
  });

  it("should return all toa when the name argument is excluded", async () => {
    const result = await executor({
      document: graphql(/* GraphQL */ `
        query GetAllToa {
          toa {
            id
          }
        }
      `),
    });

    assertSingleValue(result);

    expect(result.data?.toa?.length).toBe(6);
  });
});
