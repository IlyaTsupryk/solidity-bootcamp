require('dotenv').config()

import { task } from 'hardhat/config';

import '@nomiclabs/hardhat-waffle';
import 'hardhat-gas-reporter';


const { ROPSTEN_URL, FUJI_URL, FUJI_CHAIN_ID, PRIVATE_KEY } = process.env


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (_taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default {
  solidity: "0.8.4",
  networks: {
    ganache: {
      host: "localhost",
      port: 7545,
      url: "http://127.0.0.1:7545",
      network_id: "*" // Match any network id
    },
    hardhat: {},
    // fuji: {
    //   url: FUJI_URL,
    //   gasPrice: 225000000000,
    //   chainId: FUJI_CHAIN_ID,
    //   accounts: [`0x${PRIVATE_KEY}`]
    // },
    ropsten: {
      url: ROPSTEN_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
  gasReporter: {
    enabled: false,
    currency: "USD",
  },
};
