import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { schema } from "./schema";
import { context } from "./schema/context";

const PORT = 4000;

const yoga = createYoga({ schema, context });

const server = createServer(yoga);

server.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}/graphql`);
});
