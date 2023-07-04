require("dotenv").config();

const PROFIT_ABI = require("../artifacts/contracts/ProfitToken.sol/ProfitToken.json");

async function main() {
  const [deployer] = await ethers.getSigners();

  const receiverAddress = "0x9F275E98a6297F0457eEe526920D3C4AD7eA4601";
  const url = process.env.ALCHEMY_GOERLI_URL;
  const provider = new ethers.providers.JsonRpcProvider(url);
  console.log("Deploying contracts with the account:", deployer.address);

  const weiAmount = (await deployer.getBalance()).toString();

  const PROFIT_TOKEN_CONTRACT = new ethers.Contract(
    "0x9E156Cb8289bc5Dd2761e4e4Afefae2f7a3172bD",
    PROFIT_ABI.abi,
    provider
  );

  const data = PROFIT_TOKEN_CONTRACT.interface.encodeFunctionData("transfer", [
    receiverAddress,
    100,
  ]);

  const txn = await deployer.sendTransaction({
    to: receiverAddress,
    from: deployer.address,
    value: 100,
    data: data,
  });

  await txn.wait();

  //   const txn = await PROFIT_TOKEN_CONTRACT.connect(deployer).transfer(
  //     receiverAddress,
  //     100
  //   );

  //   await txn.wait();

  console.log("Account balance:", await ethers.utils.formatEther(weiAmount));
  console.log("txn", txn);

  //   await deployer.transfer("0x9F275E98a6297F0457eEe526920D3C4AD7eA4601", 100);

  // make sure to replace the "GoofyGoober" reference with your own ERC-20 name!
  //   const Token = await ethers.getContractFactory("ProfitToken");
  //   const token = await Token.deploy();

  //   console.log("Token address:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// Deploying contracts with the account: 0x6A23Fac2c18BaF39d7b2399A244794b6E81BF93B
// Account balance: 0.132976618636199682
// Token address: 0x9E156Cb8289bc5Dd2761e4e4Afefae2f7a3172bD
