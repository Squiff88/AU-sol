// Connect to a contract and with new signed and execute some function
async function setMessage(contract, signer) {
  const newMessage = await contract.connect(signer).modify("Hello there !");
  return newMessage;
}

module.exports = setMessage;

// The second argument we passed in is called the overrides object.
// In this object we can specify the value, which is how much ether we'd like to send.
// This object must be passed in last after all the other argument functions.
// Along with the value there are four other values that can be specified in the overrides object of a transaction
// : gasLimit, gasPrice, nonce and chainId.

// Send ETHER with a function
async function donate(contract, charityId) {
  await contract.donate(charityId, {
    value: ethers.utils.parseEther("5"),
  });
}
