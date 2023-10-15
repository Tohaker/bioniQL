import { parse } from "graphql";

import { executor, assertSingleValue } from "./utils/testUtils";

describe("Toa queries", () => {
  it("should return the correct toa when searching by name", async () => {
    const result = await executor({
      document: parse(/* GraphQL */ `
        query {
          toa(name: "Tahu") {
            id
            name
            element
          }
        }
      `),
    });

    assertSingleValue(result);

    const toa = result.data.toa[0];

    expect(toa.name).toBe("Tahu");
    expect(toa.id).toBe("8534");
    expect(toa.element).toBe("FIRE");
  });

  it("should return all toa when the name argument is excluded", async () => {
    const result = await executor({
      document: parse(/* GraphQL */ `
        query {
          toa {
            id
          }
        }
      `),
    });

    assertSingleValue(result);

    expect(result.data.toa.length).toBe(6);
  });

  it("should return the set information for each toa", async () => {
    const result = await executor({
      document: parse(/* GraphQL */ `
        query {
          toa(name: "Tahu") {
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

    const set = result.data.toa[0].set;

    expect(set.id).toBe("8534");
    expect(set.year).toBe(2001);
    expect(set.pieces).toBe(33);
    expect(set.instructions).toBe(
      "https://www.lego.com/service/buildinginstructions/8534"
    );
  });
});
