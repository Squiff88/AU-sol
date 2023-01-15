const ethers = require("ethers");
const { utils } = ethers;
const { Wallet } = ethers;

// CREATE WALLETS FROM PRIVATE KEY AND MNEMONIC
const PRIV_KEY =
  "0xf2f48ee19680706196e2e339e5da3491186e0c4c5030670656b0e0164837257d";
const mnemonic =
  "plate lawn minor crouch bubble evidence palace fringe bamboo laptop dutch ice";
// create a wallet with a private key
const wallet1 = new Wallet(PRIV_KEY);

// create a wallet from mnemonic
const wallet2 = Wallet.fromMnemonic(mnemonic);

// Format Wei into ETH
const oneEthInWei = utils.parseUnits("1", "ether");

// SEND A TRANSACTION
const signaturePromise = wallet1.signTransaction({
  value: oneEthInWei,
  to: "0xdD0DC6FB59E100ee4fA9900c2088053bBe14DE92",
  gasLimit: 21000,
});

module.exports = signaturePromise;
