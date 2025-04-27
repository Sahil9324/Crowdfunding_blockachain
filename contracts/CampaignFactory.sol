// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Campaign.sol";

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(
        string memory _title,
        string memory _description,
        uint _goal,
        uint _deadline
    ) public {
        Campaign newCampaign = new Campaign(
            msg.sender,
            _title,
            _description,
            _goal,
            _deadline
        );
        deployedCampaigns.push(address(newCampaign));
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}
