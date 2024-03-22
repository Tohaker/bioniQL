import { GraphQLError } from "graphql";
import { DbToa, DbTuraga } from "../../types";
import { builder } from "../builder";
import { Character, CharacterTeam } from "../objects/character";
import { Element, getStringFromElement } from "../objects/element";
import { Toa } from "../objects/toa";
import { Turaga } from "../objects/turaga";
import { isAxiosError } from "axios";

const CreateCharacterInput = builder.inputType("CreateCharacterInput", {
  fields: (t) => ({
    team: t.field({
      type: CharacterTeam,
      required: true,
    }),
    name: t.string({ required: true }),
    kanohi: t.string({ required: false }),
    element: t.field({
      type: Element,
      required: true,
    }),
    tool: t.string({
      required: false,
    }),
    location: t.string({ required: true }),
    set: t.string({ required: true }),
  }),
});

builder.mutationField("createCharacter", (t) =>
  t.field({
    type: Character,
    authz: {
      rules: ["IsAdmin"],
    },
    args: {
      input: t.arg({
        type: CreateCharacterInput,
        required: true,
      }),
    },
    resolve: async (_, { input }, { dataSources: { toaApi, turagaApi } }) => {
      const newCharacter = {
        id: input.set,
        name: input.name,
        powers: {
          kanohi: input.kanohi ?? "",
          element: getStringFromElement(input.element),
        },
        location: input.location,
        set: input.set ?? "",
      };

      try {
        if (input?.team === CharacterTeam.TOA) {
          const newToa: DbToa = newCharacter;

          const response = await toaApi.createToa(newToa);
          return new Toa(response);
        } else {
          const newTuraga: DbTuraga = {
            ...newCharacter,
            tool: input.tool ?? "",
          };

          const response = await turagaApi.createTuraga(newTuraga);
          return new Turaga(response);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          console.error(error.cause);
        }

        throw new GraphQLError("Character could not be created");
      }
    },
  })
);
