import { builder } from "../builder";
import { Location } from "./location";
import { Set } from "./set";

export enum CharacterTeam {
  TOA,
  TURAGA,
}

builder.enumType(CharacterTeam, {
  name: "CharacterTeam",
});

export class Character {
  locId: string;
  name: string;
  setId: string;

  constructor(locId: string, name: string, setId: string) {
    this.locId = locId;
    this.name = name;
    this.setId = setId;
  }
}

builder.interfaceType(Character, {
  name: "Character",
  description: "A character or being in the Bionicle universe",
  fields: (t) => ({
    location: t.field({
      type: Location,
      nullable: true,
      resolve: async ({ locId }, _, { dataSources: { locationApi } }) => {
        const location = await locationApi.getLocationById(locId);

        return location ? new Location(location) : null;
      },
    }),
    name: t.exposeString("name"),
    set: t.field({
      type: Set,
      nullable: true,
      resolve: async ({ setId }, _, { dataSources: { setApi } }) => {
        const set = await setApi.getSetBySku(setId);

        return set ? new Set(setId, set.year, set.pieces) : null;
      },
    }),
  }),
});
