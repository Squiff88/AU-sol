const { ethers } = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();
  const transactionCount = await owner.getTransactionCount();

  // gets the address of the token before it is deployed
  const futureAddress = ethers.utils.getContractAddress({
    from: owner.address,
    nonce: transactionCount + 1,
  });

  const MyGovernor = await ethers.getContractFactory("MyGovernor");
  const governor = await MyGovernor.deploy(futureAddress);

  const MyToken = await ethers.getContractFactory("MyToken");
  const token = await MyToken.deploy(governor.address);

  console.log(
    `Governor deployed to ${governor.address}`,
    `Token deployed to ${token.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Governor deployed to 0x58257dBCaD11251bd0eDce3A4c6bDA01a5Ee1b2a
// Token deployed to 0x9d4A1cc238409F7Ba03c292dA77e11022E4F6d0F
