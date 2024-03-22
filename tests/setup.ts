import { startServer, stopServer } from "./utils/database";

export const setup = async () => {
  await startServer();
};

export const teardown = () => {
  stopServer();
};
