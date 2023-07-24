const main = async () => {
  const governor = await hre.ethers.getContractAt(
    "MyGovernor",
    "0x58257dBCaD11251bd0eDce3A4c6bDA01a5Ee1b2a"
  );

  const proposalId =
    "92155612758108318940866337948641055196531324695967322494604655032584389795992";
  const tx = await governor.castVote(proposalId, 1);

  await tx.wait();

  console.log(tx, "tx successfull");
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
