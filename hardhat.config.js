require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  hardhat: {
    chainId: 31337,
    // gas: 2100000,
    // gasPrice: 8000000000,
  },
  // networks: {
  //   hardhat: {},
  //   polygon_mumbai: {
  //     url: "Your alchemy url",
  //     accounts: [`0x${"Your private key here"}`],
  //   },
  // },
};
