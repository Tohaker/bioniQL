import { YogaInitialContext } from "graphql-yoga";
import { MatoranAPI } from "./dataSources/matoranApi";
import { SetAPI } from "./dataSources/setApi";

export const context = async (initialContext: YogaInitialContext) => ({
  dataSources: {
    matoranApi: new MatoranAPI(),
    setApi: new SetAPI(),
  },
});

export type Context = Awaited<ReturnType<typeof context>>;
