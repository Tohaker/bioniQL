import { builder } from "../builder";

export class Set {
  constructor(public sku: string, public year: number, public pieces: number) {}
}

builder.objectType(Set, {
  name: "Set",
  description: "A LEGO® Bionicle set",
  fields: (t) => ({
    id: t.exposeString("sku"),
    year: t.exposeInt("year"),
    pieces: t.exposeInt("pieces"),
    instructions: t.string({
      description: "URL for Official set instructions",
      nullable: true,
      resolve: (set) =>
        `https://www.lego.com/service/buildinginstructions/${set.sku}`,
    }),
  }),
});

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
