import { DbTuraga } from "../../types.js";
import { builder } from "../builder.js";
import { Character } from "./character.js";
import { Element, getElementFromString } from "./element.js";

export class Turaga extends Character {
  public id: string;
  public element: Element | null;
  public tool: string;

  constructor(turaga: DbTuraga) {
    super(turaga.location, turaga.name, turaga.set, turaga.powers.kanohi);

    this.id = turaga.set;
    this.element = getElementFromString(turaga.powers.element);
    this.tool = turaga.tool;
  }
}

builder.objectType(Turaga, {
  name: "Turaga",
  description:
    "The final form of a Matoran's life, often a Toa who has completed their Destiny",
  interfaces: [Character],
  isTypeOf: (value) => value instanceof Turaga,
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    element: t.field({
      type: Element,
      nullable: true,
      resolve: (p) => p.element,
    }),
    tool: t.exposeString("tool"),
  }),
});
