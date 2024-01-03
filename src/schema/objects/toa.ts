import { builder } from "../builder";
import { Character } from "./character";
import { Element } from "./element";
import { DbToa } from "../../types";

export class Toa extends Character {
  public id: string;
  public element: Element | null;

  constructor(toa: DbToa) {
    super(toa.location, toa.name, toa.set);

    this.id = Toa.formatID(toa);

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
  interfaces: [Character],
  isTypeOf: (value) => value instanceof Toa,
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    element: t.field({
      type: Element,
      nullable: true,
      resolve: (p) => p.element,
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
