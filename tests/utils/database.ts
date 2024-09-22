import jsonServer from "json-server";
import http from "http";

// @ts-expect-error no types for db.cjs
import data from "../../data/db.cjs";

const server = jsonServer.create();
const router = jsonServer.router(data());
const middlewares = jsonServer.defaults();

server.use(middlewares);
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
