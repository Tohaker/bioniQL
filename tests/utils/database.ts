import jsonServer from "json-server";
import http from "http";

import data from "../../data/db.js";

const server = jsonServer.create();
const router = jsonServer.router(data());
const middewares = jsonServer.defaults();

server.use(middewares);
server.use(router);

const httpServer = http.createServer(server);

export const startServer = () => {
  return new Promise<void>((resolve) => {
    httpServer.listen(3000, () => {
      console.log("JSON Server is running for tests");
      resolve();
    });
  });
};

export const stopServer = () => {
  httpServer.close();
};
