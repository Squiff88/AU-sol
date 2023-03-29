const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("Faucet", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractAndSetVariables() {
    const Faucet = await ethers.getContractFactory("Faucet");
    const faucet = await Faucet.deploy();

    const [owner, signer2] = await ethers.getSigners();

    console.log("Signer 1 address: ", owner.address);
    return { faucet, owner, signer2 };
  }

  it("should deploy and set the owner correctly", async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

    expect(await faucet.owner()).to.equal(owner.address);
  });

  it("should not allow to withdraw more than 0.1 eth", async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

    const amount = ethers.utils.parseUnits("0.11", "ether");

    await expect(faucet.withdraw(amount)).to.be.reverted;
  });

  it("should not be possible to execute from other accounts than owner", async function () {
    const { faucet, signer2 } = await loadFixture(
      deployContractAndSetVariables
    );

    const connectSigner2 = await faucet.connect(signer2);

    await expect(connectSigner2.withdrawAll()).to.be.reverted;
  });

  it("should not be possible to destroy the contract from other accounts than owner", async function () {
    const { faucet, signer2 } = await loadFixture(
      deployContractAndSetVariables
    );

    const connectSigner2 = await faucet.connect(signer2);

    await expect(connectSigner2.destroyFaucet()).to.be.reverted;
  });
});
