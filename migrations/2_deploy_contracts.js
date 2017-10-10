var AtomicSwap = artifacts.require("./AtomicSwap.sol");

module.exports = function(deployer) {
  deployer.deploy(AtomicSwap);
};
