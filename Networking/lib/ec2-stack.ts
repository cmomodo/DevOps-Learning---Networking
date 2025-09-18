import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";

export interface Ec2StackProps extends cdk.StackProps {
  vpc: ec2.IVpc;
}

export class Ec2Stack extends cdk.Stack {
  public readonly instance: ec2.Instance;
  constructor(scope: Construct, id: string, props: Ec2StackProps) {
    super(scope, id, props);

    const sg = new ec2.SecurityGroup(this, "InstanceSg", {
      vpc: props.vpc,
      allowAllOutbound: true,
      description: "security group for ec2",
      securityGroupName: "nginx-sg",
    });
    sg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), "allow ssh access");
    sg.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(80),
      "allow http access"
    );

    const machineImage = ec2.MachineImage.genericLinux({
      "us-east-1": "ami-0b09ffb6d8b58ca91",
    });

    //commands for the instance to install
    const userData = ec2.UserData.forLinux();
    userData.addCommands(
      "yum update -y",
      "yum install -y nginx",
      "systemctl start nginx",
      "systemctl enable nginx"
    );

    //EC2 Key Pair
    const keyPair = ec2.KeyPair.fromKeyPairName(
      this,
      "EC2KeyPair",
      "EC2_Tutorial"
    );

    //instance block
    this.instance = new ec2.Instance(this, "Instance", {
      vpc: props.vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T2,
        ec2.InstanceSize.MICRO
      ),

      machineImage,
      keyPair: keyPair,
      securityGroup: sg,
      userData,
      instanceName: "nginx_instance_1",
    });

    // Optionally, output the instance ID to help locate it
    new cdk.CfnOutput(this, "InstanceId", { value: this.instance.instanceId });
  }
}
