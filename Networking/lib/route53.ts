import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets';

export interface Route53StackProps extends cdk.StackProps {
  instance: ec2.Instance;
}

export class Route53Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: Route53StackProps) {
    super(scope, id, props);

    const hostedZone = route53.HostedZone.fromLookup(this, 'HostedZone', {
      domainName: 'myname.co.uk',
    });

    new route53.ARecord(this, 'NginxARecord', {
      zone: hostedZone,
      recordName: 'nginx',
      target: route53.RecordTarget.fromIpAddresses(props.instance.instancePublicIp),
      ttl: cdk.Duration.seconds(300),
    });
  }
}
