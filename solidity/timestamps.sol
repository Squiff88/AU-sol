// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Switch {
    address payable beneficiary;
    uint256 inactivityPeriod;
    address owner;

    constructor(address _beneficiary) payable {
        beneficiary = payable(_beneficiary);
        inactivityPeriod = block.timestamp;
        owner = msg.sender;
    }

    function withdraw() external {
        // If the contract was not active more than 52 weeks (1 year) , withdraw the funds !
        require(
            block.timestamp - inactivityPeriod >= 52 weeks,
            "Contract is still active"
        );

        (bool success, ) = beneficiary.call{value: address(this).balance}("");
        require(success, "Transfer failed");
    }

    function ping() external {
        require(owner == msg.sender, "You are not authorized for this action");

        inactivityPeriod = block.timestamp;
    }
}
