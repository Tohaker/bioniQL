import { YogaInitialContext } from "graphql-yoga";
import { LocationAPI } from "./dataSources/locationApi";
import { ToaAPI } from "./dataSources/toaApi";
import { TuragaAPI } from "./dataSources/turagaApi";
import { SetAPI } from "./dataSources/setApi";
import { UsersAPI } from "./dataSources/usersApi";

export const context = async (initialContext: YogaInitialContext) => {
  const usersApi = new UsersAPI();
  const user = await usersApi.getUser(
    initialContext.request.headers.get("x-user-id") ?? "1"
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
