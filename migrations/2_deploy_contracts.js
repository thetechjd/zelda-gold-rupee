var Token = artifacts.require("./Token.sol");
var MyTokenSale = artifacts.require("./MyTokenSale.sol");
var KycContract = artifacts.require("./KycContract.sol");


module.exports = async function (deployer) {
  var addr = await web3.eth.getAccounts();
  await deployer.deploy(Token, "100000000000000000000");
  await deployer.deploy(KycContract);
  await deployer.deploy(MyTokenSale, 1, addr[0], Token.address, KycContract.address);
  var instance = await Token.deployed();
  await instance.transfer(MyTokenSale.address, "100000000000000000000");

};
