import { createServer } from "node:http";
import { yoga } from "./yoga";

const PORT = 4000;

const server = createServer(yoga);

server.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}/graphql`);
});
