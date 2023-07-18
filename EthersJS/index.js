const ethers = require("ethers");
const { utils } = ethers;
const { Wallet, providers } = ethers;

// SHOULD BE IMPLEMENTED !!!
const { ganacheProvider } = require("./config");

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

// SIGN A TRANSACTION
const signaturePromise = wallet1.signTransaction({
  value: oneEthInWei,
  to: "0xdD0DC6FB59E100ee4fA9900c2088053bBe14DE92",
  gasLimit: 21000,
});

// SEND ether with multiple transactions adding NONCE
async function sendEther({ value, to }) {
  return wallet.sendTransaction({ value, to });
}

// Get balance of a wallet
const provider = new providers.Web3Provider(ganacheProvider);

function findMyBalance(privateKey) {
  const wallet = new Wallet(privateKey, provider);

  return wallet.getBalance();
  // retrieve the balance, given a private key
}

// Find private key from mnemonic

const wallet = ethers.Wallet.fromMnemonic("one two three four");

console.log(wallet.privateKey, "private key maina");

// Send multiple txns from a wallet

async function donate(privateKey, charities) {
  // TODO: donate to charity!
  const wallet = new Wallet(privateKey, provider);

  const charityEth = utils.parseEther("1.0");

  for (charity of charities) {
    await wallet.sendTransaction({ value: charityEth, to: charity });
  }
}

// Find all addresses that received ETH from a given address
const blocks = [1, 2, 3];
async function findEther(address) {
  const addrArray = [];

  for (block of blocks) {
    const minedBlock = await provider.getBlockWithTransactions(block);

    if (minedBlock.transactions) {
      const { transactions } = minedBlock;

      transactions.map((transaction) => {
        if (transaction.from === address) {
          addrArray.push(transaction.to);
        }
      });
    }
  }

  console.log(addrArray, "addrArray ....");
  return addrArray;
}

module.exports = signaturePromise;
