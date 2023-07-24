const { ethers } = require("hardhat");

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

  const tx = await governor.propose(
    [token.address],
    [0],
    [
      token.interface.encodeFunctionData("mint", [
        owner.address,
        ethers.utils.parseEther("25000"),
      ]),
    ],
    "Give the owner more tokens!"
  );
  const receipt = await tx.wait();
  const event = receipt.events.find((x) => x.event === "ProposalCreated");
  const { proposalId } = event.args;

  console.log(proposalId, "proposal ID maina");

  // BigNumber { value: "92155612758108318940866337948641055196531324695967322494604655032584389795992" }
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
