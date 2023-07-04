const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

function firstTopic() {
  const eventSignature = "Transfer(address,address,uint256)"; // <-- TODO #1: fill in the event signature!
  const bytes = utf8ToBytes(eventSignature);
  const digest = keccak256(bytes);
  return toHex(digest);
}

function secondTopic() {
  // TODO #2: add the address and left-pad it with zeroes to 32 bytes
  // then return the value
  const address =
    "00000000000000000000000028c6c06298d514db089934071355e5743bf21d60";
  return address;
}

module.exports = { firstTopic, secondTopic };

require("dotenv").config();
const { Alchemy, Network } = require("alchemy-sdk");
const { firstTopic, secondTopic } = require("./topics");
// prefix both the topics with 0x
const topics = [firstTopic(), secondTopic()].map((x) => "0x" + x);

const config = {
  apiKey: process.env.API_KEY,
  network: Network.ETH_MAINNET,
};

let totalDai = BigInt(0);

const alchemy = new Alchemy(config);

async function totalDaiTransferred(fromBlock, toBlock) {
  totalDai = BigInt(0);
  const logs = await alchemy.core.getLogs({
    address: "0x6b175474e89094c44da98b954eedeac495271d0f", // <-- TODO #1: fill in the dai address here
    fromBlock,
    toBlock,
    topics,
  });

  // take a look at the first log in the response
  const bigInt = BigInt(logs[0].data);

  logs.filter((data) => {
    totalDai += BigInt(data.data);
  });

  return totalDai;
}

module.exports = totalDaiTransferred;
