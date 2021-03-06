const path = require("path");
require('dotenv').config({ path: './.env' });
console.log(process.env.MNEMONIC);
const HDWalletProvider = require("@truffle/hdwallet-provider");
const AccountIndex = 1;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "./src/contracts"),
  networks: {
    develop: {
      port: 7545,
      host: "127.0.0.1",
      network_id: 5777
    },
    ganache_local: {
      provider: function () {
        return new HDWalletProvider(process.env.MNEMONIC, "http://127.0.0.1:7545")
      },
      network_id: 1337
    },
    goerli_infura: {
      provider: function () {
        return new HDWalletProvider(process.env.MNEMONIC, "https://goerli.infura.io/v3/fee8917ab09e4e409ada6f602b288672", AccountIndex)
      },
      network_id: 5
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(process.env.MNEMONIC, "https://rinkeby.infura.io/v3/1d05071c42a04801ad3fd372fa386d23", AccountIndex)
      },
      network_id: 4
    },
    ropsten_infura: {
      provider: function () {
        return new HDWalletProvider(process.env.MNEMONIC, "https://ropsten.infura.io/v3/1d05071c42a04801ad3fd372fa386d23", AccountIndex)
      },
      network_id: 3,
      gas: 300000
    }
  },
  compilers: {
    solc: {
      version: "0.6.2"
    }
  }

};

