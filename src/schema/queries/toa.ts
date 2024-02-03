import { DbToa } from "../../types";
import { builder } from "../builder";
import { Toa } from "../objects/toa";

builder.queryField("toa", (t) =>
  t.field({
    type: [Toa],
    description: "Retrieve Toa heroes",
    args: {
      name: t.arg({
        type: "String",
        required: false,
        description:
          "Name of the Toa to find. Omit to return all Toa in the database",
      }),
    },
    nullable: true,
    resolve: async (_, args, { dataSources: { toaApi } }) => {
      let data: DbToa[] = [];

      if (args.name) {
        data = await toaApi.getToaByName(args.name);
      } else {
        data = await toaApi.getAllToa();
      }

      return data.map((toa) => new Toa(toa));
    },
  })
);
