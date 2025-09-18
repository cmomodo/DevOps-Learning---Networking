#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { NetworkingStack } from '../lib/networking-stack';
import { Ec2Stack } from '../lib/ec2-stack';

import { Route53Stack } from '../lib/route53';

const app = new cdk.App();

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const networking = new NetworkingStack(app, 'NetworkingStack', {
  env,
});

const ec2Stack = new Ec2Stack(app, 'Ec2Stack', {
  env,
  vpc: networking.vpc,
});

new Route53Stack(app, 'Route53Stack', {
  env,
  instance: ec2Stack.instance,
});
