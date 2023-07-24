const { ethers } = require("hardhat");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { Utils } = require("alchemy-sdk");

const main = async () => {
  const [owner] = await ethers.getSigners();

  const token = await hre.ethers.getContractAt(
    "MyToken",
    "0x9d4A1cc238409F7Ba03c292dA77e11022E4F6d0F"
  );

  const governor = await hre.ethers.getContractAt(
    "MyGovernor",
    "0x58257dBCaD11251bd0eDce3A4c6bDA01a5Ee1b2a"
  );

  await governor.execute(
    [token.address],
    [
      "92155612758108318940866337948641055196531324695967322494604655032584389795992",
    ],
    [
      token.interface.encodeFunctionData("mint", [
        owner.address,
        ethers.utils.parseEther("25000"),
      ]),
    ],
    Utils.hashMessage(Utils.toUtf8Bytes("Give the owner more tokens!"))
  );

  //   await hre.network.provider.send("evm_mine");

  console.log("success");
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
