import { graphql } from "gql.tada";
import {
  executor,
  assertSingleValue,
  assertCharacters,
  createExecutor,
} from "./utils/testUtils.js";

describe("Character queries", () => {
  describe("Shared properties", () => {
    it("should return the basic information for each character", async () => {
      const result = await executor({
        document: graphql(/* GraphQL */ `
          query GetCharacters {
            character {
              name
            }
          }
        `),
      });

      assertSingleValue(result);

      const characters = result.data?.character;

      if (!assertCharacters(characters)) {
        throw new Error("No characters returned");
      }

      characters.forEach((c) => {
        expect(c?.name).toEqual(expect.any(String));
      });
    });

    it("should return the set information for each character", async () => {
      const result = await executor({
        document: graphql(/* GraphQL */ `
          query GetCharactersSets {
            character {
              set {
                id
                year
                pieces
                instructions
              }
            }
          }
        `),
      });

      assertSingleValue(result);

      const characters = result.data?.character;

      if (!assertCharacters(characters)) {
        throw new Error("No characters returned");
      }

      characters.forEach(({ set }) => {
        expect(set?.id).toEqual(expect.any(String));
        expect(set?.year).toEqual(expect.any(Number));
        expect(set?.pieces).toEqual(expect.any(Number));
        expect(set?.instructions).toContain(
          "https://www.lego.com/service/buildinginstructions"
        );
      });
    });

    it("should return the location information for each character", async () => {
      const result = await executor({
        document: graphql(/* GraphQL */ `
          query GetCharactersLocation {
            character {
              location {
                island
                region
                about
              }
            }
          }
        `),
      });

      assertSingleValue(result);

      const characters = result.data?.character;

      if (!assertCharacters(characters)) {
        throw new Error("No characters returned");
      }

      characters.forEach(({ location }) => {
        expect(location?.island).toEqual("Mata Nui");
        expect(location?.region).toEqual(expect.any(String));
        expect(location?.about).toContain("https://biosector01.com/wiki/");
      });
    });
  });

  describe("Toa", () => {
    it("should return toa specific properties", async () => {
      const result = await executor({
        document: graphql(/* GraphQL */ `
          query GetToaSpecificDetails {
            character {
              __typename
              ... on Toa {
                id
                element
              }
            }
          }
        `),
      });

      assertSingleValue(result);

      const characters = result.data?.character;

      if (!assertCharacters(characters)) {
        throw new Error("No characters returned");
      }

      characters.forEach((c) => {
        if (c.__typename !== "Toa") {
          return;
        }

        expect(c.__typename).toEqual("Toa");
        expect(c.id).toEqual(expect.any(String));
        expect(c?.element).toEqual(expect.any(String));
      });
    });
  });

  describe("Turaga", () => {
    it("should return turaga specific properties", async () => {
      const result = await executor({
        document: graphql(/* GraphQL */ `
          query GetTuragaSpecificDetails {
            character {
              __typename
              ... on Turaga {
                id
                element
                tool
              }
            }
          }
        `),
      });

      assertSingleValue(result);

      const characters = result.data?.character;

      if (!assertCharacters(characters)) {
        throw new Error("No characters returned");
      }

      characters.forEach((c) => {
        if (c.__typename !== "Turaga") {
          return;
        }

        expect(c.__typename).toEqual("Turaga");
        expect(c.id).toEqual(expect.any(String));
        expect(c?.element).toEqual(expect.any(String));
        expect(c?.tool).toEqual(expect.any(String));
      });
    });
  });
});

describe("Character mutations", () => {
  const createNewToaCharacter = graphql(/* GraphQL */ `
    mutation CreateNewToaCharacter($input: CreateCharacterInput!) {
      createCharacter(input: $input) {
        ... on Toa {
          id
          name
          location {
            about
            id
            island
            region
          }
          element
        }
      }
    }
  `);

  it("should create a new toa character", async () => {
    const result = await executor({
      document: createNewToaCharacter,
      variables: {
        input: {
          element: graphql.scalar("Element", "FIRE"),
          location: "1",
          name: "Bonky McBonkface",
          team: graphql.scalar("CharacterTeam", "TOA"),
          set: "1234",
        },
      },
    });

    assertSingleValue(result);

    const newToa = result.data?.createCharacter;

    expect(newToa).toEqual({
      name: "Bonky McBonkface",
      id: "1234",
      element: "FIRE",
      location: {
        about: "https://biosector01.com/wiki/Ta-Wahi",
        id: "1",
        island: "Mata Nui",
        region: "Ta-Wahi",
      },
    });
  });

  it("should create a new turaga character", async () => {
    const result = await executor({
      document: graphql(/* GraphQL */ `
        mutation CreateNewTuragaCharacter($input: CreateCharacterInput!) {
          createCharacter(input: $input) {
            ... on Turaga {
              id
              name
              location {
                about
                id
                island
                region
              }
              element
              tool
            }
          }
        }
      `),
      variables: {
        input: {
          element: graphql.scalar("Element", "FIRE"),
          location: "1",
          name: "Bonky McBonkface",
          team: graphql.scalar("CharacterTeam", "TURAGA"),
          set: "1234",
          tool: "Big stick",
        },
      },
    });

    assertSingleValue(result);

    const newTuraga = result.data?.createCharacter;

    expect(newTuraga).toEqual({
      name: "Bonky McBonkface",
      id: "1234",
      element: "FIRE",
      location: {
        about: "https://biosector01.com/wiki/Ta-Wahi",
        id: "1",
        island: "Mata Nui",
        region: "Ta-Wahi",
      },
      tool: "Big stick",
    });
  });

  it("should throw an error when the user is not an admin", async () => {
    const guestExecutor = createExecutor({
      "x-user-id": "",
    });

    const result = await guestExecutor({
      document: createNewToaCharacter,
      variables: {
        input: {
          element: graphql.scalar("Element", "FIRE"),
          location: "1",
          name: "Bonky McBonkface",
          team: graphql.scalar("CharacterTeam", "TOA"),
          set: "1234",
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
