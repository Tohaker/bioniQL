#!/usr/bin/env node
import { App, type Environment } from "aws-cdk-lib";
import { BioniQLStack } from "./BioniQLStack";

const app = new App();
const env: Environment = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

new BioniQLStack(app, "BioniQLStack", { env });
