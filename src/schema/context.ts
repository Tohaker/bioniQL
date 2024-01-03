import { YogaInitialContext } from "graphql-yoga";
import { ToaAPI } from "./dataSources/toaApi";
import { SetAPI } from "./dataSources/setApi";

export const context = async (initialContext: YogaInitialContext) => ({
  dataSources: {
    toaApi: new ToaAPI(),
    setApi: new SetAPI(),
  },
});

export type Context = Awaited<ReturnType<typeof context>>;
