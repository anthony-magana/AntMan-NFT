
const hre = require("hardhat");

async function main() {

  // We get the contract to deploy
  const AntManNFT = await hre.ethers.getContractFactory("AntManNFT");
  const antManNFT = await AntManNFT.deploy();

  await antManNFT.deployed();

  console.log("AntManNFT deployed to:", antManNFT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
