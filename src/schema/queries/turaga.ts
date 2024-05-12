import { DbTuraga } from "../../types.js";
import { builder } from "../builder.js";
import { Turaga } from "../objects/turaga.js";

builder.queryField("turaga", (t) =>
  t.field({
    type: [Turaga],
    description: "Retrieve Turaga",
    args: {
      name: t.arg({
        type: "String",
        required: false,
        description:
          "Name of the Turaga to find. Omit to return all Turaga in the database",
      }),
    },
    nullable: true,
    resolve: async (_, args, { dataSources: { turagaApi } }) => {
      let data: DbTuraga[] = [];

      if (args.name) {
        data = await turagaApi.getTuragaByName(args.name);
      } else {
        data = await turagaApi.getAllTuraga();
      }

      return data.map((turaga) => new Turaga(turaga));
    },
  })
);
