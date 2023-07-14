const hre = require("hardhat");

async function main() {

  //Transfer Deploy Section
  const TransferFunds = await hre.ethers.getContractFactory("TransferFunds");
  const transferFunds = await TransferFunds.deploy();

  await transferFunds.deployed();

  console.log(`Transfer  ${transferFunds.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
