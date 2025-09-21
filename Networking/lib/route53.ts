import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as route53Targets from "aws-cdk-lib/aws-route53-targets";

export interface Route53StackProps extends cdk.StackProps {
  instance: ec2.Instance;
}

export class Route53Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: Route53StackProps) {
    super(scope, id, props);

    //The hosted zone for route53
    const hostedZone = route53.HostedZone.fromLookup(this, "HostedZone", {
      domainName: process.env.ROUTE53_DOMAIN_NAME || "ceedev.co.uk",
    });

    //The a record for route53
    new route53.ARecord(this, "NginxARecord", {
      zone: hostedZone,
      //the record name is the subdomain
      recordName: process.env.ROUTE53_SUBDOMAIN || "nginx",
      target: route53.RecordTarget.fromIpAddresses(
        props.instance.instancePublicIp
      ),
      ttl: cdk.Duration.seconds(parseInt(process.env.ROUTE53_TTL || "300")),
    });
  }
}
