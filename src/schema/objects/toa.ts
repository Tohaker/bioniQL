import { builder } from "../builder";
import { Element } from "./element";
import { DbToa } from "../../types";
import { Set } from "./set";

export class Toa {
  public id: string;
  public name: string;
  public element: Element | null;
  public set: string;

  constructor(toa: DbToa) {
    this.id = Toa.formatID(toa);
    this.name = toa.name;
    this.set = toa.set;

    const _element = toa.powers.element;

    if (_element.toUpperCase() in Element) {
      this.element = Element[_element.toUpperCase() as keyof typeof Element];
    } else {
      this.element = null;
    }
  }

  public static formatID = (toa: DbToa) => toa.set;
}

builder.objectType(Toa, {
  name: "Toa",
  description: "Biomechanical being possessing an elemental ability",
  fields: (t) => ({
    id: t.exposeString("id"),
    name: t.exposeString("name"),
    element: t.field({
      type: Element,
      nullable: true,
      resolve: (p) => p.element,
    }),
    set: t.field({
      type: Set,
      nullable: true,
      resolve: async (toa, _, { dataSources: { setApi } }) => {
        const set = await setApi.getSetBySku(toa.set);

        return set ? new Set(toa.set, set.year, set.pieces) : null;
      },
    }),
  }),
});

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
