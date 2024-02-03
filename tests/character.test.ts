import { graphql } from "./gql";
import {
  executor,
  assertSingleValue,
  assertCharacters,
} from "./utils/testUtils";

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
