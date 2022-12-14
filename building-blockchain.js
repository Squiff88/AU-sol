const Block = require("./Block");

class Blockchain {
  constructor() {
    this.chain = [];
    const genesisBlock = new Block("The genesis block of MethodChain !");
    this.chain.push(genesisBlock);
  }

  addBlock(block) {
    block.previousHash = this.chain[this.chain.length - 1].toHash();

    this.chain.push(block);
  }

  isValid() {
    let isValidBlock = true;
    for (let i = this.chain.length - 1; i > 0; i--) {
      const currentHash = this.chain[i].previousHash;
      const prevHash = this.chain[i - 1].toHash();

      if (prevHash.toString() !== currentHash.toString()) {
        isValidBlock = false;
      }
    }
    console.log(isValidBlock, "is it valud maina >>>");
    return isValidBlock;
  }
}

module.exports = Blockchain;
