import { YogaInitialContext } from "graphql-yoga";
import { LocationAPI } from "./dataSources/locationApi";
import { ToaAPI } from "./dataSources/toaApi";
import { TuragaAPI } from "./dataSources/turagaApi";
import { SetAPI } from "./dataSources/setApi";

export const context = async (initialContext: YogaInitialContext) => ({
  dataSources: {
    locationApi: new LocationAPI(),
    toaApi: new ToaAPI(),
    turagaApi: new TuragaAPI(),
    setApi: new SetAPI(),
  },
});

export type Context = Awaited<ReturnType<typeof context>>;
