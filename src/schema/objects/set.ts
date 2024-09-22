import { builder } from "../builder.js";

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
