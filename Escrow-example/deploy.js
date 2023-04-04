const ethers = require("ethers");

/**
 * Deploys the Escrow contract with a 1 ether deposit
 *
 * @param {array} abi - interface for the Escrow contract
 * @param {string} bytecode - EVM code for the Escrow contract
 * @param {ethers.types.Signer} signer - the depositor EOA
 * @param {string} arbiterAddress - hexadecimal address for arbiter
 * @param {string} beneficiaryAddress - hexadecimal address for benefiiciary
 *
 * @return {promise} a promise of the contract deployment
 */
function deploy(abi, bytecode, signer, arbiterAddress, beneficiaryAddress) {
  const contractFactory = new ethers.ContractFactory(abi, bytecode, signer);
  const deployContractPromise = contractFactory.deploy(
    arbiterAddress,
    beneficiaryAddress,
    { value: ethers.utils.parseEther("1") }
  );

  return deployContractPromise;
}

/**
 * Approves the Escrow, signed by the arbiter
 *
 * @param {ethers.Contract} contract - ethers.js contract instance
 * @param {ethers.types.Signer} arbiterSigner - the arbiter EOA
 *
 * @return {promise} a promise of the approve transaction
 */
function approve(contract, arbiterSigner) {
  return contract.connect(arbiterSigner).approve();
}

module.exports = deploy;
