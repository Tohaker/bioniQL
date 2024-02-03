import { builder } from "../builder";
import { Set } from "../objects/set";

builder.queryField("set", (t) =>
  t.field({
    type: Set,
    description: "Retrieve a Bionicle set",
    args: {
      id: t.arg({
        type: "String",
        required: true,
        description: "ID of the set to find, found on the box or canister",
      }),
    },
    nullable: true,
    resolve: async (_, args, { dataSources: { setApi } }) => {
      const set = await setApi.getSetBySku(args.id);

      return set ? new Set(set.sku, set.year, set.pieces) : null;
    },
  })
);
