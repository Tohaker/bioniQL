import { startServer, stopServer } from "./utils/database.js";

export const setup = async () => {
  await startServer();
};

export const teardown = () => {
  stopServer();
};
