import { YogaInitialContext } from "graphql-yoga";
import { LocationAPI } from "./dataSources/locationApi";
import { ToaAPI } from "./dataSources/toaApi";
import { SetAPI } from "./dataSources/setApi";

export const context = async (initialContext: YogaInitialContext) => ({
  dataSources: {
    locationApi: new LocationAPI(),
    toaApi: new ToaAPI(),
    setApi: new SetAPI(),
  },
});

export type Context = Awaited<ReturnType<typeof context>>;
