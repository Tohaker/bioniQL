import { builder } from "../builder";

export enum Element {
  FIRE,
  WATER,
  AIR,
  ICE,
  STONE,
  EARTH,
}

export const getElementFromString = (element: string) => {
  if (element.toUpperCase() in Element) {
    return Element[element.toUpperCase() as keyof typeof Element];
  } else {
    return null;
  }
};

builder.enumType(Element, {
  name: "Element",
});
