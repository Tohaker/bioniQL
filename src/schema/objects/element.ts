import { builder } from "../builder";

export enum Element {
  FIRE,
  WATER,
  AIR,
  ICE,
  STONE,
  EARTH,
}

builder.enumType(Element, {
  name: "Element",
});
