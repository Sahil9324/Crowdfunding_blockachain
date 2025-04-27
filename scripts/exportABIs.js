const fs = require('fs');
const path = require('path');

// Load compiled artifacts
const factoryArtifact = require('../artifacts/contracts/CampaignFactory.sol/CampaignFactory.json');
const campaignArtifact = require('../artifacts/contracts/Campaign.sol/Campaign.json');

// Replace this with the deployed factory address
const factoryAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const factoryData = {
  address: factoryAddress,
  abi: factoryArtifact.abi
};

const campaignData = {
  abi: campaignArtifact.abi
};

// Create the output directory if it doesn't exist
const outputDir = path.resolve(__dirname, '../frontend/src/utils');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write files
fs.writeFileSync(`${outputDir}/contractFactory.json`, JSON.stringify(factoryData, null, 2));
fs.writeFileSync(`${outputDir}/contractCampaign.json`, JSON.stringify(campaignData, null, 2));

console.log("✅ ABI files exported to frontend/src/utils");
