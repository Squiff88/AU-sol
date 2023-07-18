const { ethers, upgrades } = require("hardhat");

async function main() {
  const VendingMachineV1 = await ethers.getContractFactory("VendingMachineV1");
  const proxy = await upgrades.deployProxy(VendingMachineV1, [100]);
  await proxy.deployed();

  const implementationAddress = await upgrades.erc1967.getImplementationAddress(
    proxy.address
  );

  const proxyAddress = await proxy.address;

  console.log("Proxy contract address: " + proxyAddress);

  console.log("Implementation contract address: " + implementationAddress);
}

main();

// Proxy contract address: 0x80470e8C04FD174D7336E0ED00830811549d8649
// Implementation contract address: 0x734ed15E8f3003F1EF54957e924ffEeF32E795CB

// SECOND TIME

// Proxy contract address: 0x65a8b922B2a4B749A02AF6F30350ab9cA8864490
// Implementation contract address: 0xC08aB8461A4E7A6d65219cA2E28F268A1252a62D
