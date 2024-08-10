import { isAxiosError } from "axios";
import { GraphQLError } from "graphql";

import { DbTuraga } from "../../types.js";
import { builder } from "../builder.js";
import { Element, getStringFromElement } from "../objects/element.js";
import { Turaga } from "../objects/turaga.js";

const UpdateTuragaInput = builder.inputType("UpdateTuragaInput", {
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
    tool: t.string({ required: false }),
  }),
});

builder.mutationField("updateTuraga", (t) =>
  t.field({
    type: Turaga,
    authScopes: {
      admin: true,
    },
    args: {
      input: t.arg({
        type: UpdateTuragaInput,
        required: true,
      }),
    },
    resolve: async (_, { input }, { dataSources: { turagaApi } }) => {
      let existingTuraga: DbTuraga;

      try {
        existingTuraga = await turagaApi.getTuragaById(input.id);
      } catch (error) {
        if (isAxiosError(error)) {
          console.warn(error.cause);
        }

        throw new GraphQLError(`Turaga with ID ${input.id} was not found`);
      }

      const updatedTuraga: DbTuraga = {
        name: input.name ?? existingTuraga.name,
        powers: {
          kanohi: input.kanohi ?? existingTuraga.powers.kanohi,
          element: input.element
            ? getStringFromElement(input.element)
            : existingTuraga.powers.element,
        },
        location: input.location ?? existingTuraga.location,
        set: input.set ?? existingTuraga.set,
        tool: input.tool ?? existingTuraga.tool,
      };

      const newTuraga = await turagaApi.updateTuraga(input.id, updatedTuraga);

      return new Turaga(newTuraga);
    },
  })
);
