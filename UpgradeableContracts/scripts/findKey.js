const { ethers } = require("hardhat");

const wallet = ethers.Wallet.fromMnemonic("one two three ");

console.log(wallet.privateKey, "private key maina");
console.log(wallet.address, "address key maina");

//0xab5fc2406a5b9fbc2042a6090d6081da5df8f15807ef881220f01cf819cf8d86

// prev
// e0b9f7371bddfc61fd5c1139b2e09f03f0959604be61fbe3024ec925301dc9cc
