const { ethers, upgrades } = require("hardhat");

// TO DO: Place the address of your proxy here!
const proxyAddress = "0x65a8b922B2a4B749A02AF6F30350ab9cA8864490";

async function main() {
  const VendingMachineV2 = await ethers.getContractFactory("VendingMachineV2");

  const upgraded = await upgrades.upgradeProxy(proxyAddress, VendingMachineV2);

  const implementationAddress = await upgrades.erc1967.getImplementationAddress(
    proxyAddress
  );

  const ownerAddress = await upgraded.owner();

  console.log("The current contract owner is: " + ownerAddress);
  console.log("Implementation contract address: " + implementationAddress);
}

main();

// The current contract owner is: 0x9F275E98a6297F0457eEe526920D3C4AD7eA4601
// Implementation contract address: 0x073651675f7712e8ea4ef1817cbef46def68ca7e
//
