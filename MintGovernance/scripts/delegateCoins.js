const { ethers } = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();

  const token = await hre.ethers.getContractAt(
    "MyToken",
    "0x9d4A1cc238409F7Ba03c292dA77e11022E4F6d0F"
  );
  await token.delegate(owner.address);

  console.log("success");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
