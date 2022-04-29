/* eslint-disable no-process-exit */
const hre = require("hardhat");

async function main() {
  const Nft = await hre.ethers.getContractFactory("Nft");
  const NFT = await Nft.deploy();

  await NFT.deployed();

  console.log("My NFT deployed to:", NFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
