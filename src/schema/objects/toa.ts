import axios from "axios";

import { builder } from "../builder";
import { Element } from "./element";
import { DbSet, DbToa } from "../../types";
import { Set } from "./set";

export class Toa {
  public id: string;
  public name: string;
  public element: Element | null;
  public set: DbSet;

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

  public static formatID = (toa: DbToa) => `${toa.set.sku}-${toa.set.year}`;
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
      resolve: (toa) => new Set(toa.set.sku, toa.set.year, toa.set.pieces),
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
    resolve: async (_, args) => {
      const { data } = await axios.get<DbToa[]>("http://localhost:3000/toa");

      if (args.name) {
        const foundToa = data.filter(
          // Normalise input
          ({ name }) => name.toLowerCase() === args.name?.toLowerCase()
        );

        return foundToa.map((toa) => new Toa(toa));
      }

      return data.map((toa) => new Toa(toa));
    },
  })
);
