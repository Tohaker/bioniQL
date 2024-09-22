import { builder } from "../builder.js";
import { Character } from "./character.js";
import { Element, getElementFromString } from "./element.js";
import { DbToa } from "../../types.js";

export class Toa extends Character {
  public id: string;
  public element: Element | null;

  constructor(toa: DbToa) {
    super(toa.location, toa.name, toa.set);

    this.id = toa.set;
    this.element = getElementFromString(toa.powers.element);
  }
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
