import { builder } from "../builder.js";

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

export const getStringFromElement = (element: Element) => {
  return Element[element];
};

builder.enumType(Element, {
  name: "Element",
});
