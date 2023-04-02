// replace the name of the contract with which one you want to deploy!
const contractName = "Game2";

async function main() {
  const Game = await hre.ethers.getContractFactory(contractName);
  // if you need to add constructor arguments for the particular game, add them here:
  const game = await Game.deploy();
  console.log(`${contractName} deployed to address: ${game.address}`);

  await game.deployed();

  await game.setX(15);

  await game.setY(35);

  console.log(await game.x(), "x ??");
  console.log(await game.y(), "y ??");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
