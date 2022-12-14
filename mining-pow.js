const SHA256 = require("crypto-js/sha256");
const TARGET_DIFFICULTY =
  BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
  // TODO: add transaction to mempool
  mempool.push(transaction);
}

function mine() {
  // TODO: mine a block

  const newBlock = {
    id: blocks.length,
    transactions: [],
    nonce: 0,
  };

  // Update the nonce to compare until its less than TARGET_DIFFICULTY
  const updateNonce = () => {
    newBlock.nonce++;

    const hashedBlock = SHA256(JSON.stringify(newBlock));

    if (BigInt(`0x${hashedBlock}`) > TARGET_DIFFICULTY) {
      updateNonce();
    }
  };

  // Save the length of mempool cause afterwords mempool gets mutated;
  const mempoolLen = mempool.length;

  for (let i = 0; i <= mempoolLen - 1; i++) {
    if (newBlock.transactions.length < MAX_TRANSACTIONS) {
      newBlock.transactions.push(mempool[i]);
      mempool.shift();
    }
  }

  const hashedBlock = SHA256(JSON.stringify(newBlock));
  newBlock.hash = hashedBlock;

  while (BigInt(`0x${newBlock.hash}`) > TARGET_DIFFICULTY) {
    updateNonce();

    newBlock.hash = SHA256(JSON.stringify(newBlock));
  }

  blocks.push(newBlock);
}

for (let i = 0; i < 5; i++) {
  addTransaction({ sender: "bob", to: "alice" });
}

mine();

module.exports = {
  TARGET_DIFFICULTY,
  MAX_TRANSACTIONS,
  addTransaction,
  mine,
  blocks,
  mempool,
};
