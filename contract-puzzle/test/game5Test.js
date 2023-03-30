const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");

describe("Game5", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();

    const [signer1] = await ethers.getSigners();

    return { game, signer1 };
  }
  it("should be a winner 5", async function () {
    const { game, signer1 } = await loadFixture(deployContractAndSetVariables);

    const createRandomAddress = async () =>
      ethers.Wallet.createRandom().connect(ethers.provider);
    let random = await createRandomAddress();

    const threshold = 0x00ffffffffffffffffffffffffffffffffffffff;

    while (threshold < random.address) {
      random = await createRandomAddress();
    }

    await signer1.sendTransaction({
      to: random.address,
      value: ethers.utils.parseEther("1"),
    });

    // good luck
    await game.connect(random).win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
