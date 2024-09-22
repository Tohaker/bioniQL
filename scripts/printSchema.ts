import { writeFileSync } from "fs";
import { printSchema, lexicographicSortSchema } from "graphql";
import { schema } from "../src/schema/index.js";

const schemaAsString = printSchema(lexicographicSortSchema(schema));

writeFileSync("schema.graphql", schemaAsString, { encoding: "utf-8" });
