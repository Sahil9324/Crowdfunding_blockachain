const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Factory = await hre.ethers.getContractFactory("CampaignFactory");
  const factory = await Factory.deploy();
  await factory.waitForDeployment();

  const contractAddress = await factory.getAddress();
  console.log("Factory deployed to:", contractAddress);

  // Write ABI and address to a file for frontend
  const contractData = {
    address: contractAddress,
    abi: Factory.interface.format("json"), // ethers v6+
  };

  const outputPath = path.resolve(__dirname, "../frontend/src/utils/contract.json");
  fs.writeFileSync(outputPath, JSON.stringify(contractData, null, 2));

  console.log("✅ Contract info written to frontend/src/utils/contract.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});





// const hre = require("hardhat");
// const fs = require("fs");
// const path = require("path");

// async function main() {
//   const [deployer] = await hre.ethers.getSigners();
//   console.log("Deploying contracts with the account:", deployer.address);

//   // Get the contract factory
//   const Factory = await hre.ethers.getContractFactory("CampaignFactory");

//   // Deploy the contract
//   const factory = await Factory.deploy();
//   console.log("Contract deployed to:", factory.address);

//   // Wait for the transaction to be mined (ensure deployment completion)
//   const receipt = await factory.deployTransaction.wait();
//   console.log(`Contract deployment confirmed in block: ${receipt.blockNumber}`);

//   // Write the contract ABI and address to a JSON file for frontend usage
//   const contractData = {
//     address: factory.address,
//     abi: JSON.stringify(Factory.interface.format("json")), // Correct ABI formatting
//   };

//   const outputPath = path.resolve(__dirname, "../frontend/src/utils/contract.json");
//   fs.writeFileSync(outputPath, JSON.stringify(contractData, null, 2));

//   console.log("✅ Contract info written to frontend/src/utils/contract.json");
// }

// main().catch((error) => {
//   console.error("Error during deployment:", error);
//   process.exitCode = 1;
// });






