const Devansh = artifacts.require("Devansh");
const DevanshSale = artifacts.require("DevanshSale");

module.exports = async function(deployer, network, accounts) {
  // Deploy token with initial supply of 1,000,000 tokens
  const initialSupply = web3.utils.toWei('1000000', 'ether');
  
  await deployer.deploy(Devansh, initialSupply);
  const tokenInstance = await Devansh.deployed();
  
  console.log('==============================================');
  console.log('Token Deployment Complete!');
  console.log('==============================================');
  console.log('Devansh Token Address:', tokenInstance.address);
  console.log('==============================================');
  
  // Deploy sale contract
  await deployer.deploy(DevanshSale, tokenInstance.address, web3.utils.toWei('0.001', 'ether'));
  const saleInstance = await DevanshSale.deployed();
  
  console.log('DevanshSale Contract Address:', saleInstance.address);
  console.log('==============================================');
  console.log('Update your frontend with:');
  console.log('TOKEN_CONTRACT_ADDRESS =', tokenInstance.address);
  console.log('SALE_CONTRACT_ADDRESS =', saleInstance.address);
  console.log('==============================================');
};
