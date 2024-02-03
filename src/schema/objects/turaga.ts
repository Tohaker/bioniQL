import { DbTuraga } from "../../types";
import { builder } from "../builder";
import { Character } from "./character";
import { Element, getElementFromString } from "./element";

export class Turaga extends Character {
  public id: string;
  public element: Element | null;
  public tool: string;

  constructor(turaga: DbTuraga) {
    super(turaga.location, turaga.name, turaga.set);

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
