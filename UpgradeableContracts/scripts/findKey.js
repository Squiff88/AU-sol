const { ethers } = require("hardhat");

const wallet = ethers.Wallet.fromMnemonic("one two three ");

console.log(wallet.privateKey, "private key maina");
console.log(wallet.address, "address key maina");
