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

    expect(result.data?.toa?.length).toBeGreaterThanOrEqual(6);
  });
});

describe("Toa mutations", () => {
  it("should update a toa", async () => {
    const newName = "Haha wind fly";

    const result = await executor({
      document: graphql(/* GraphQL */ `
        mutation UpdateToaLewa($input: UpdateToaInput!) {
          updateToa(input: $input) {
            id
            name
            element
          }
        }
      `),
      variables: {
        input: {
          id: "8535",
          name: newName,
        },
      },
    });

    assertSingleValue(result);

    expect(result.data?.updateToa.name).toEqual(newName);
  });

  it("should throw an error when trying to update a non-existant toa", async () => {
    const result = await executor({
      document: graphql(/* GraphQL */ `
        mutation UpdateUnknownToa($input: UpdateToaInput!) {
          updateToa(input: $input) {
            id
          }
        }
      `),
      variables: {
        input: {
          id: "4321",
          name: "new name",
        },
      },
    });

    assertSingleValue(result);

    expect(result.errors?.[0].message).toEqual(
      "Toa with ID 4321 was not found"
    );
  });
});
