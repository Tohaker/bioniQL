import { DbToa, DbTuraga } from "../../types";
import { builder } from "../builder";
import { Character } from "../objects/character";
import { Toa } from "../objects/toa";
import { Turaga } from "../objects/turaga";

builder.queryField("character", (t) =>
  t.field({
    type: [Character],
    description: "Retrive information on characters",
    args: {
      name: t.arg({
        type: "String",
        required: false,
        description:
          "Name of the character to find. Omit to return all characters in the database",
      }),
    },
    nullable: true,
    resolve: async (_, args, { dataSources: { toaApi, turagaApi } }) => {
      let toa: DbToa[] = [];
      let turaga: DbTuraga[] = [];

      if (args.name) {
        [toa, turaga] = await Promise.all([
          toaApi.getToaByName(args.name),
          turagaApi.getTuragaByName(args.name),
        ]);
      } else {
        [toa, turaga] = await Promise.all([
          toaApi.getAllToa(),
          turagaApi.getAllTuraga(),
        ]);
      }

      return [
        ...toa.map((t) => new Toa(t)),
        ...turaga.map((t) => new Turaga(t)),
      ];
    },
  })
);
