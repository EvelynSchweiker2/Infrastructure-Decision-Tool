Infrastructure Decision Tool

Purpose:
This project provides a simple command-line utility for evaluating basic infrastructure decisions.

Files:
- infrastructure_tool.js: Main Node.js script
- package.json: Project metadata and scripts

Usage:
1. Install dependencies (none required for the basic script):
   npm install
2. Run the tool:
   node infrastructure_tool.js
3. Optional help:
   node infrastructure_tool.js --help

Subnet Host Checker Examples

Example 1: Sufficient Subnet
VPC CIDR: /16
Subnet CIDR: /24
Devices Required: 100

Available IP Addresses: 251
Result: Sufficient
Unused IP Addresses: 151

Example 2: Insufficient Subnet
VPC CIDR: /16
Subnet CIDR: /28
Devices Required: 20

Available IP Addresses: 11
Result: Insufficient
Additional IP Addresses Needed: 9

Notes:
This is a starter implementation intended to support further decision-scoring logic, cost analysis, and architecture recommendations.
