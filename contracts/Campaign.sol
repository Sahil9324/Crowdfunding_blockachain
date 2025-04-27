// SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// contract Campaign {
//     address public owner;
//     string public title;
//     string public description;
//     uint public goal;
//     uint public deadline;
//     uint public totalFunded;

//     address[] public funders;
//     mapping(address => uint) public contributions;

//     constructor(
//         address _owner,
//         string memory _title,
//         string memory _description,
//         uint _goal,
//         uint _deadline
//     ) {
//         owner = _owner;
//         title = _title;
//         description = _description;
//         goal = _goal;
//         deadline = block.timestamp + _deadline;
//     }

//     function fund() public payable {
//         require(block.timestamp < deadline, "Campaign over");
//         require(msg.value > 0, "Send ETH");

//         if (contributions[msg.sender] == 0) {
//             funders.push(msg.sender);
//         }

//         contributions[msg.sender] += msg.value;
//         totalFunded += msg.value;
//     }

//     function getFunders() public view returns (address[] memory) {
//         return funders;
//     }

//     function getDetails() public view returns (
//         string memory, string memory, uint, uint, uint, address
//     ) {
//         return (title, description, goal, deadline, totalFunded, owner);
//     }
// }





pragma solidity ^0.8.0;

contract Campaign {
    address public owner;
    string public title;
    string public description;
    uint public goal;
    uint public deadline;
    uint public totalFunded;

    address[] public funders;
    mapping(address => uint) public contributions;

    constructor(
        address _owner,
        string memory _title,
        string memory _description,
        uint _goal,
        uint _deadline
    ) {
        owner = _owner;
        title = _title;
        description = _description;
        goal = _goal;
        deadline = block.timestamp + _deadline;
    }

    function fund() public payable {
        require(block.timestamp < deadline, "Campaign over");
        require(msg.value > 0, "Send ETH");

        if (contributions[msg.sender] == 0) {
            funders.push(msg.sender);
        }

        contributions[msg.sender] += msg.value;
        totalFunded += msg.value;
    }

    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        require(totalFunded > 0, "No funds to withdraw");

        uint amount = totalFunded;
        totalFunded = 0; // Reset first to prevent reentrancy attack

        (bool success, ) = payable(owner).call{value: amount}("");
        require(success, "Withdraw failed");
    }

    function getFunders() public view returns (address[] memory) {
        return funders;
    }

    function getDetails() public view returns (
        string memory, string memory, uint, uint, uint, address
    ) {
        return (title, description, goal, deadline, totalFunded, owner);
    }
}
