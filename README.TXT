Infrastructure Decision Tool

Purpose:
This project provides a command-line utility for evaluating basic infrastructure decisions using two tools:

1. Subnet Host Checker
2. Compute Environment Selector

Files:

- infrastructure_tool.js: Main Node.js program
- package.json: Project dependencies
- package-lock.json: Dependency version information
- README.TXT: Project documentation

Requirements:

- Node.js
- readline-sync

Installation:

1. Open a terminal in the project folder.
2. Install the required dependency:
   npm install
3. Run the program:
   node infrastructure_tool.js

Tool 1: Subnet Host Checker

Evaluates whether a subnet has enough usable IP addresses for the required number of devices. It also checks whether the subnet CIDR prefix is consistent with the VPC CIDR prefix.

Example 1 - Sufficient Subnet:

- VPC CIDR: /16
- Subnet CIDR: /24
- Devices required: 100
- Total IP addresses: 256
- AWS reserved IP addresses: 5
- Available IP addresses: 251
- Result: Sufficient
- Unused IP addresses: 151

Example 2 - Insufficient Subnet:

- VPC CIDR: /16
- Subnet CIDR: /28
- Devices required: 20
- Total IP addresses: 16
- AWS reserved IP addresses: 5
- Available IP addresses: 11
- Result: Insufficient
- Additional IP addresses needed: 9

Tool 2: Compute Environment Selector

Recommends an infrastructure architecture based on application name, expected monthly users, monthly budget, and high availability requirements.

Architecture recommendations:

- Fewer than 1,000 users without high availability: Single EC2
- 1,000 to 10,000 users without high availability: EC2 + Load Balancer
- More than 10,000 users or high availability required: EC2 + Load Balancer + Auto Scaling

Budget warnings:

- Under $1,000: Warning if the recommendation requires more than a single EC2 instance.
- $1,000 to $3,000: Warning if the recommendation requires Auto Scaling.

Notes:
The Subnet Host Checker accounts for the five IPv4 addresses AWS reserves in each subnet. Numeric inputs should be entered without commas or dollar signs.
