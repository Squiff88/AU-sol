// add the game address here and update the contract name if necessary
const gameAddr = "0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE";
const contractName = "Game5";

async function main() {
  // attach to the game
  const game = await hre.ethers.getContractAt(contractName, gameAddr);

  const [signer1, signer2] = await ethers.getSigners();

  // console.log(signer1, "signer");

  // const balance = await ethers.provider.getBalance(signer1.address);

  // console.log(ethers.utils.parseEther(balance.toString()), "balance ");
  await game.giveMeAllowance(100000);
  // await game.connect(signer2).mint(1000);
  await game.mint(60000);
  const tx = await game.win();

  // did you win? Check the transaction receipt!
  // if you did, it will be in both the logs and events array
  const receipt = await tx.wait();
  console.log(receipt);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
