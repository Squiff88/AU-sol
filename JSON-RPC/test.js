const { assert } = require("chai");
const { getBlockNumber, getBalance } = require("./index");
const provider = require("../provider");

describe("getBlockNumber", function () {
  it("should get the current block number", async () => {
    const blockNumber = await getBlockNumber();
    assert.equal(blockNumber, 0);
  });

  describe("after mining a block", () => {
    before(() => {
      return provider.send({ id: 1, jsonrpc: "2.0", method: "evm_mine" });
    });

    it("should get the latest block number", async () => {
      const blockNumber = await getBlockNumber();
      assert.equal(blockNumber, 1);
    });
  });
});

describe("getBalance", () => {
  it("should find the balance of the address with 10 ether", async () => {
    const balance = await getBalance(
      "0x5409ED021D9299bf6814279A6A1411A7e866A631"
    );
    assert.equal(balance, 0x8ac7230489e80000);
  });
});

const ADDRESS = "0x5409ED021D9299bf6814279A6A1411A7e866A631";

describe("getNonce", () => {
  it("should get the nonce", async () => {
    const nonce = await getNonce(ADDRESS);
    assert.equal(nonce, 0);
  });

  describe("after sending a transaction", () => {
    before(() => {
      return provider.send({
        id: 1,
        jsonrpc: "2.0",
        method: "eth_sendTransaction",
        params: [
          {
            from: ADDRESS,
            to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
            value: 0x1,
          },
        ],
      });
    });

    it("should get the nonce", async () => {
      const nonce = await getNonce(ADDRESS);
      assert.equal(nonce, 1);
    });
  });
});

function runTransaction() {
  return provider.send({
    id: 1,
    jsonrpc: "2.0",
    method: "eth_sendTransaction",
    params: [
      {
        from: ADDRESS,
        to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
        value: 0x1,
      },
    ],
  });
}

function mineBlock() {
  return provider.send({
    id: 1,
    jsonrpc: "2.0",
    method: "evm_mine",
  });
}

describe("getTotalTransactions", () => {
  before(async () => {
    await provider.send({
      id: 1,
      jsonrpc: "2.0",
      method: "miner_stop",
    });
  });

  describe("on the first block", () => {
    before(mineBlock);

    it("should return zero total transactions", async () => {
      const length = await getTotalTransactions(1);
      assert.equal(length, 0);
    });
  });

  describe("on the second block", () => {
    before(async () => {
      await runTransaction();
      await mineBlock();
    });

    it("should return one total transactions", async () => {
      const length = await getTotalTransactions(2);
      assert.equal(length, 1);
    });
  });

  describe("on the third block", () => {
    before(async () => {
      for (let i = 0; i < 5; i++) {
        await runTransaction();
      }
      await mineBlock();
    });

    it("should return five total transactions", async () => {
      const length = await getTotalTransactions(3);
      assert.equal(length, 5);
    });
  });

  describe("on the 11th block", () => {
    before(async () => {
      // mine blocks 4-10
      for (let i = 0; i < 7; i++) {
        await mineBlock();
      }
      for (let i = 0; i < 3; i++) {
        await runTransaction();
      }
      await mineBlock();
    });

    it("should return three total transactions", async () => {
      const length = await getTotalTransactions(11);
      assert.equal(length, 3);
    });
  });
});

const addresses = [
  "0x5409ed021d9299bf6814279a6a1411a7e866a631",
  "0xebbe46f475db84e70313592eb4f94df73043c118",
  "0xd4d38fc5fd03a9beba9e9a41573ef8de75c2784c",
  "0xec4a61ce697253baa1088b2ea9112b9483098e64",
  "0xfbf1d566853edc65cdeda8e22975ca1ebfc4ed38",
];

describe("getTotalBalance", () => {
  it("should find the total balance of all the addresses", async () => {
    const totalBalance = await getTotalBalance(addresses);
    assert.equal(totalBalance, "15".padEnd(19, "0"));
  });
});
