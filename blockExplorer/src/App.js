import { Alchemy, Network, Utils } from "alchemy-sdk";
import { useEffect, useState } from "react";

import "./App.css";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

const renderBlockData = (blockData) => (
  <div className="container">
    <div className="wrapper">
      <p>Block Data:</p>
      <div className="block-data">
        Block Number: {blockData && blockData.number}
      </div>
      <div className="block-data">
        Block Timestamp:{" "}
        {blockData && new Date(blockData.timestamp).toLocaleDateString("en-US")}
      </div>
      <div className="block-data">
        Gas Used: {blockData && Utils.formatUnits(blockData.gasUsed, "wei")} WEI
      </div>
    </div>
    <div className="wrapper">
      <p>Block Transactions Data:</p>
      {blockData &&
        blockData.transactions.map((transaction) => {
          return (
            <div className="list-item" key={Math.random(0.8 * 13)}>
              <div>From : {transaction.from}</div>
              <div>Nonce : {transaction.nonce}</div>
              <div>Price : {Utils.formatEther(transaction.value._hex)} ETH</div>
            </div>
          );
        })}
    </div>
  </div>
);

function App() {
  const [latestBlock, setLatestBlock] = useState(null);
  const [blockList, setBlockList] = useState([]);

  async function getBlockData() {
    const getLatestBlock = await alchemy.core.getBlockNumber();

    if (Number(getLatestBlock)) {
      const blockData = await alchemy.core.getBlockWithTransactions(
        getLatestBlock
      );

      setLatestBlock(blockData);
    }
  }

  async function blockListHandler(blockNumber) {
    const blockData = await alchemy.core.getBlockWithTransactions(
      Number(blockNumber)
    );

    if (blockData) {
      setBlockList([blockData, ...blockList]);
    }
  }

  useEffect(() => {
    getBlockData();
  }, []);

  return (
    <div className="app">
      <div className="container">
        <div className="search-wrapper">
          <label>Search for a block</label>
          <input
            type="search"
            placeholder="Block number"
            onChange={(e) =>
              setTimeout(() => blockListHandler(e.target.value), 700)
            }
          />
        </div>
      </div>
      <div>
        {blockList.map((blockItem) => (
          <div className="section">{renderBlockData(blockItem)}</div>
        ))}
        <div className="section">{renderBlockData(latestBlock)}</div>
      </div>
    </div>
  );
}

export default App;
