// SPDX-License-Identifier: MIT

// Smart contract that lets anyone deposit ETH into the contract
// Only the owner of the contract can withdraw the ETH

pragma solidity ^0.6.0;

// Get the latest ETH/USD price from chainlink price feed

contract Invoice {
    // safe math library check uint256 for integer overflows

    //mapping to store which address depositeded how much ETH
    mapping(address => uint256) public addressToAmountFunded;
    // array of addresses who deposited
    address[] public funders;
    //address of the owner (who deployed the contract)
    address public owner;

    // the first person to deploy the contract is
    // the owner
    constructor() public {
        owner = msg.sender;
    }

    function fund() public payable {
        // 18 digit number to be compared with donated amount
        //if not, add to mapping and funders array
        addressToAmountFunded[msg.sender] += msg.value;
        funders.push(msg.sender);
    }

    //function to get the version of the chainlink pricefeed

    //modifier: https://medium.com/coinmonks/solidity-tutorial-all-about-modifiers-a86cf81c14cb

    // onlyOwner modifer will first check the condition inside it
    // and
    // if true, withdraw function will be executed
    function withdraw() public payable {
        require(msg.sender == owner);
        // If you are using version eight (v0.8) of chainlink aggregator interface,
        // you will need to change the code below to
        payable(msg.sender).transfer(address(this).balance);
        //msg.sender.transfer(address(this).balance);
    }
}

//iterate through all the mappings and make them 0
//since all the deposited amount has been withdrawn
