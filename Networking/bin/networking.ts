#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { NetworkingStack } from '../lib/networking-stack';
import { Ec2Stack } from '../lib/ec2-stack';

import { Route53Stack } from '../lib/route53';

const app = new cdk.App();
const networking = new NetworkingStack(app, 'NetworkingStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});

const ec2Stack = new Ec2Stack(app, 'Ec2Stack', {
  // If you set env above, mirror the same env here (same account/region)
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
  vpc: networking.vpc,
});

new Route53Stack(app, 'Route53Stack', {
  instance: ec2Stack.instance,
});
