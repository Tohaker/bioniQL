import { YogaInitialContext } from "graphql-yoga";
import { ToaAPI } from "./dataSources/toaApi";

export const context = async (initialContext: YogaInitialContext) => ({
  dataSources: {
    toaApi: new ToaAPI(),
  },
});

export type Context = Awaited<ReturnType<typeof context>>;
