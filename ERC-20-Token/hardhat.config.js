require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: process.env.ALCHEMY_GOERLI_URL,
      accounts: [process.env.RINKEBY_PRIVATE_KEY],
    },
  },
};

// Deploying contracts with the account: 0x6A23Fac2c18BaF39d7b2399A244794b6E81BF93B
// Account balance: 0.132976618636199682
// Token address: 0x9E156Cb8289bc5Dd2761e4e4Afefae2f7a3172bD
