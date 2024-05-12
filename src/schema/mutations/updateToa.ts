import { isAxiosError } from "axios";
import { GraphQLError } from "graphql";

import { builder } from "../builder.js";
import { Toa } from "../objects/toa.js";
import { Element, getStringFromElement } from "../objects/element.js";
import { DbToa } from "../../types.js";

const UpdateToaInput = builder.inputType("UpdateToaInput", {
  fields: (t) => ({
    id: t.id({ required: true }),
    name: t.string({ required: false }),
    kanohi: t.string({ required: false }),
    element: t.field({
      type: Element,
      required: false,
    }),
    location: t.string({ required: false }),
    set: t.string({ required: false }),
  }),
});

builder.mutationField("updateToa", (t) =>
  t.field({
    type: Toa,
    authz: {
      rules: ["IsAdmin"],
    },
    args: {
      input: t.arg({
        type: UpdateToaInput,
        required: true,
      }),
    },
    resolve: async (_, { input }, { dataSources: { toaApi } }) => {
      let existingToa: DbToa;

      try {
        existingToa = await toaApi.getToaById(input.id);
      } catch (error) {
        if (isAxiosError(error)) {
          console.warn(error.cause);
        }

        throw new GraphQLError(`Toa with ID ${input.id} was not found`);
      }

      const updatedToa: DbToa = {
        name: input.name ?? existingToa.name,
        powers: {
          kanohi: input.kanohi ?? existingToa.powers.kanohi,
          element: input.element
            ? getStringFromElement(input.element)
            : existingToa.powers.element,
        },
        location: input.location ?? existingToa.location,
        set: input.set ?? existingToa.set,
      };

      const newToa = await toaApi.updateToa(input.id, updatedToa);

      return new Toa(newToa);
    },
  })
);
