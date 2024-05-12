import { graphql } from "gql.tada";
import {
  executor,
  assertSingleValue,
  createExecutor,
} from "./utils/testUtils.js";

describe("Turaga queries", () => {
  it("should return the correct turaga when searching by name", async () => {
    const result = await executor({
      document: graphql(/* GraphQL */ `
        query GetTuragaVakama {
          turaga(name: "Vakama") {
            id
            name
            element
          }
        }
      `),
    });

    assertSingleValue(result);

    const turaga = result.data?.turaga?.[0];

    expect(turaga?.name).toBe("Vakama");
    expect(turaga?.id).toBe("8540");
    expect(turaga?.element).toBe("FIRE");
  });

  it("should return all turaga when the name argument is excluded", async () => {
    const result = await executor({
      document: graphql(/* GraphQL */ `
        query GetAllTuraga {
          turaga {
            id
          }
        }
      `),
    });

    assertSingleValue(result);

    expect(result.data?.turaga?.length).toBeGreaterThanOrEqual(6);
  });
});

describe("Turaga mutations", () => {
  const updateTuragaMutation = graphql(/* GraphQL */ `
    mutation UpdateTuragaMatau($input: UpdateTuragaInput!) {
      updateTuraga(input: $input) {
        id
        name
      }
    }
  `);

  it("should update a turaga", async () => {
    const newName = "Haha wind fly";

    const result = await executor({
      document: updateTuragaMutation,
      variables: {
        input: {
          id: "8541",
          name: newName,
        },
      },
    });

    assertSingleValue(result);

    expect(result.data?.updateTuraga.name).toEqual(newName);
  });

  it("should throw an error when trying to update a non-existant turaga", async () => {
    const result = await executor({
      document: graphql(/* GraphQL */ `
        mutation UpdateUnknownTuraga($input: UpdateTuragaInput!) {
          updateTuraga(input: $input) {
            id
          }
        }
      `),
      variables: {
        input: {
          id: "1234",
          name: "new name",
        },
      },
    });

    assertSingleValue(result);

    expect(result.errors?.[0].message).toEqual(
      "Turaga with ID 1234 was not found"
    );
  });

  it("should throw an error when the user is not an admin", async () => {
    const guestExecutor = createExecutor({
      "x-user-id": "",
    });

    const newName = "Haha wind fly";

    const result = await guestExecutor({
      document: updateTuragaMutation,
      variables: {
        input: {
          id: "8541",
          name: newName,
        },
      },
    });

    assertSingleValue(result);

    expect(result.data).toBeUndefined();
    expect(result.errors).toEqual([
      {
        extensions: {
          code: "FORBIDDEN",
        },
        message: "You must be an admin to access this resource.",
      },
    ]);
  });
});
