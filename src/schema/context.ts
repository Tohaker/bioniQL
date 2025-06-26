import { YogaInitialContext } from "graphql-yoga";
import { LocationAPI } from "./dataSources/locationApi.js";
import { ToaAPI } from "./dataSources/toaApi.js";
import { TuragaAPI } from "./dataSources/turagaApi.js";
import { SetAPI } from "./dataSources/setApi.js";
import { UsersAPI } from "./dataSources/usersApi.js";

export const context = async (initialContext: YogaInitialContext) => {
  const usersApi = new UsersAPI();
  const user = await usersApi.getUser(
    initialContext.request.headers.get("x-user-id") || "1"
  );

  return {
    dataSources: {
      locationApi: new LocationAPI(),
      toaApi: new ToaAPI(),
      turagaApi: new TuragaAPI(),
      setApi: new SetAPI(),
    },
    user,
  };
};

export type Context = Awaited<ReturnType<typeof context>>;
