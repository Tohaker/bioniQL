import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { resolve } from "path";

export class BioniQLStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const graphqlLambda = new NodejsFunction(this, "GraphQLFunction", {
      entry: resolve(import.meta.dirname, "../src/handler.ts"),
      runtime: Runtime.NODEJS_22_X,
      bundling: {
        sourceMap: true,
        nodeModules: ["json-server"],
      },
      environment: {
        NODE_OPTIONS: "--enable-source-maps",
      },
    });

    new LambdaRestApi(this, "GraphQLEndpoint", {
      handler: graphqlLambda,
    });
  }
}
