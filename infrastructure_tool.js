#!/usr/bin/env node

const readlineSync = require('readline-sync');

function displayMenu() {
  console.log('\n================================');
  console.log('   INFRASTRUCTURE DECISION TOOL');
  console.log('================================');
  console.log('1. Subnet Host Checker');
  console.log('2. Compute Environment Selector');
  console.log('3. Exit');
}

function getCIDR(prompt) {
  while (true) {
    const input = readlineSync.question(prompt).trim();
    const cidr = Number(input.replace('/', ''));

    if (/^\/?\d+$/.test(input) && Number.isInteger(cidr) && cidr >= 16 && cidr <= 30) {
      return cidr;
    }

    console.log('Invalid CIDR. Enter a prefix between /16 and /30.');
  }
}

function getPositiveInteger(prompt) {
  while (true) {
    const input = readlineSync.question(prompt).trim();
    const number = Number(input);

    if (input !== '' && Number.isSafeInteger(number) && number > 0) {
      return number;
    }

    console.log('Invalid input. Please enter a positive integer.');
  }
}

function subnetHostChecker() {
  console.log('\n--- SUBNET HOST CHECKER ---');

  const vpcCIDR = getCIDR('Enter VPC CIDR (example: /16): ');
  const subnetCIDR = getCIDR('Enter Subnet CIDR (example: /24): ');
  const devices = getPositiveInteger('Enter number of devices required: ');

  console.log('\n--- RESULTS ---');

  if (subnetCIDR < vpcCIDR) {
    console.log('Subnet prefix consistent with VPC: NO');
    console.log('The subnet is larger than the VPC network.');
    console.log('Enter a subnet prefix equal to or greater than the VPC prefix.');
    return;
  }

  console.log('Subnet prefix consistent with VPC: YES');

  const totalIPs = Math.pow(2, 32 - subnetCIDR);
  const usableIPs = Math.max(0, totalIPs - 5);

  console.log('Total IP addresses: ' + totalIPs);
  console.log('AWS reserved IP addresses: 5');
  console.log('Available IP Addresses: ' + usableIPs);
  console.log('Devices required: ' + devices);

  if (usableIPs >= devices) {
    console.log('Result: Sufficient');
    console.log('Unused IP addresses: ' + (usableIPs - devices));
  } else {
    console.log('Result: Insufficient');
    console.log('Additional IP addresses needed: ' + (devices - usableIPs));
  }
}

function getBudget() {
  while (true) {
    const input = readlineSync.question('Enter monthly budget ($): ').trim();
    const budget = Number(input);

    if (input !== '' && Number.isFinite(budget) && budget >= 0) {
      return budget;
    }

    console.log('Invalid budget. Enter a non-negative number.');
  }
}

function getYesNo(prompt) {
  while (true) {
    const input = readlineSync.question(prompt).trim().toLowerCase();

    if (input === 'yes' || input === 'y') {
      return true;
    }

    if (input === 'no' || input === 'n') {
      return false;
    }

    console.log('Please enter yes or no.');
  }
}

function computeEnvironmentSelector() {
  console.log('\n--- COMPUTE ENVIRONMENT SELECTOR ---');

  let applicationName = '';

  while (applicationName === '') {
    applicationName = readlineSync.question('Enter application name: ').trim();

    if (applicationName === '') {
      console.log('Application name cannot be empty.');
    }
  }

  const monthlyUsers = getPositiveInteger('Enter monthly users: ');
  const monthlyBudget = getBudget();
  const highAvailability = getYesNo('Does the application require high availability? (yes/no): ');

  let architecture;

  if (monthlyUsers > 10000 || highAvailability) {
    architecture = 'EC2 + Load Balancer + Auto Scaling';
  } else if (monthlyUsers >= 1000) {
    architecture = 'EC2 + Load Balancer';
  } else {
    architecture = 'Single EC2';
  }

  console.log('\n--- RECOMMENDATION ---');
  console.log('Application: ' + applicationName);
  console.log('Monthly users: ' + monthlyUsers);
  console.log('Monthly budget: $' + monthlyBudget.toFixed(2));
  console.log('High availability: ' + (highAvailability ? 'Yes' : 'No'));
  console.log('Recommended architecture: ' + architecture);

  if (monthlyBudget < 1000 && architecture !== 'Single EC2') {
    console.log('\nWARNING: Your budget is under $1,000.');
    console.log('The recommended architecture requires more than a single EC2 instance.');
  } else if (
    monthlyBudget >= 1000 &&
    monthlyBudget <= 3000 &&
    architecture === 'EC2 + Load Balancer + Auto Scaling'
  ) {
    console.log('\nWARNING: Your budget is between $1,000 and $3,000.');
    console.log('The recommended architecture requires Auto Scaling.');
  } else {
    console.log('\nNo budget warning based on the assignment guidelines.');
  }
}

function main() {
  let running = true;

  console.log('Welcome to the Infrastructure Decision Tool!');

  while (running) {
    displayMenu();

    const choice = readlineSync.question('\nSelect an option (1-3): ').trim();

    switch (choice) {
      case '1':
        subnetHostChecker();
        break;
      case '2':
        computeEnvironmentSelector();
        break;
      case '3':
        console.log('\nThank you for using the Infrastructure Decision Tool!');
        running = false;
        break;
      default:
        console.log('\nInvalid selection. Please choose 1, 2, or 3.');
    }

    if (running) {
      const continueRunning = getYesNo('\nWould you like to return to the main menu? (yes/no): ');

      if (!continueRunning) {
        console.log('\nThank you for using the Infrastructure Decision Tool!');
        running = false;
      }
    }
  }
}

main();
