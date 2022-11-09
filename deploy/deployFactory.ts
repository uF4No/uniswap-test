import { Wallet, Provider, utils } from 'zksync-web3';
import * as ethers from 'ethers';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { Deployer } from '@matterlabs/hardhat-zksync-deploy';

export default async function (hre: HardhatRuntimeEnvironment) {
  // Initialize the wallet.
  const wallet = new Wallet('PRIV_KEY');

  // Create deployer object and load the artifact of the contract you want to deploy.
  const deployer = new Deployer(hre, wallet);
  const uniFactory = await deployer.loadArtifact('UniswapV3Factory');

  console.log('Loaded');
  const deploymentFee = await deployer.estimateDeployFee(uniFactory, []);
  console.log('deploymentFee :>> ', deploymentFee);
  const parsedFee = ethers.utils.formatEther(deploymentFee.toString());
  console.log(`The deployment is estimated to cost ${parsedFee} ETH`);

  const factoryContract = await deployer.deploy(uniFactory);

  // Show the contract info.
  const contractAddress = factoryContract.address;
  console.log(`${uniFactory.contractName} was deployed to ${contractAddress}`);
}
