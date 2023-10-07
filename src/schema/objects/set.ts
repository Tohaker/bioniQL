import axios from "axios";
import { DB_HOSTNAME } from "../../constants";
import { DbSet } from "../../types";
import { builder } from "../builder";
import { URL } from "url";

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
      resolve: async (set) =>
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
    resolve: async (_, args) => {
      const url = new URL(DB_HOSTNAME);
      url.pathname = "/sets";
      url.searchParams.append("sku", args.id);
      url.searchParams.append("_limit", "1");

      const { data } = await axios.get<DbSet[]>(url.href);

      if (!data.length) return null;

      return new Set(data[0].sku, data[0].year, data[0].pieces);
    },
  })
);
