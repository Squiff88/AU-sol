// GET THE CURRENT BLOCK NUMBER
async function getBlockNumber() {
  const response = await provider.send({
    jsonrpc: "2.0",
    id: 83,
    method: "eth_blockNumber", // <-- TODO: fill in the method name
  });

  // TODO: return the block number
  const { result } = response;
  console.log(response, "result ");

  return result;
}

// GET CURRENT BALANCE
async function getBalance(address) {
  const response = await provider.send({
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getBalance", // <-- fill in the method
    params: [address, "latest"], // <-- fill in the params
  });

  // return the balance of the address

  console.log(response, "response maina");

  const { result } = response;

  return result;
}

// GET NONCE FROM TXN
async function getNonce(address) {
  const response = await provider.send({
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getTransactionCount", // <-- fill in the method
    params: [address], // <-- fill in the params
  });

  console.log(response, "response");

  const { result } = response;

  return result;
}

// GET TOTAL NUMBER OF TRANSACTIONS IN A BLOCK

async function getTotalTransactions(blockNumber) {
  const response = await provider.send({
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getBlockByNumber",
    params: [blockNumber, true],
  });

  const { result } = response;

  return result.transactions.length;
  console.log(response, "resposen maina ");

  // return the total number of transactions in the block
}

// BATCH TRANSACTIONS AND SEND THEM IN ONE CALL
async function getTotalBalance(addresses) {
  const balances = addresses.map((address, i) => {
    return {
      jsonrpc: "2.0",
      id: i + 1,
      method: "eth_getBalance",
      params: [address, "latest"],
    };
  });
  const response = await provider.send(balances);
  let totalBalance = 0;

  for (let res of response) {
    const { result } = res;
    totalBalance += parseInt(result);
  }
  // return the total balance of all the addresses
  return totalBalance;
}

module.exports = {
  getBlockNumber,
  getBalance,
  getNonce,
  getTotalTransactions,
  getTotalBalance,
};
