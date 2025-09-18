# Welcome to the Networking module

This module contains CDK constructs for setting up networking resources in AWS.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `npx cdk deploy` deploy this stack to your default AWS account/region
- `npx cdk diff` compare deployed stack with current state
- `npx cdk synth` emits the synthesized CloudFormation template

# About the Networking module

This module sets up a Virtual Private Cloud (VPC) with public subnets and deploys an EC2 instance running Nginx. The EC2 instance is configured with a security group that allows HTTP traffic on port 80 and SSH access on port 22. The instance uses a specified key pair for secure access. We would then buy a domain from Cloudflare and then use that domain to point to the IP address of the EC2 instance.

## Prerequisites

- AWS CDK installed
- AWS CLI configured with appropriate credentials
- Node.js and npm installed
- An existing EC2 key pair in the desired AWS region
- A domain name purchased from Cloudflare

## System Architecture

## Example output
