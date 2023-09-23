import axios from "axios";

import { builder } from "../builder";
import { Element } from "./element";
import { DbToa } from "../../types";

export class Toa {
  constructor(
    public id: string,
    public name: string,
    public element: Element
  ) {}
}

builder.objectType(Toa, {
  name: "Toa",
  description: "Biomechanical being posessing an elemental ability",
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    element: t.field({
      type: Element,
      resolve: (p) => p.element,
    }),
  }),
});

builder.queryField("toa", (t) =>
  t.field({
    type: [Toa],
    resolve: async () => {
      const { data } = await axios.get<DbToa[]>("http://localhost:3000/toa");

      return data.map(
        ({ name, powers: { element }, set: { number, year } }) =>
          new Toa(
            `${number}-${year}`,
            name,
            Element[element.toUpperCase() as keyof typeof Element]
          )
      );
    },
  })
);
