// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    address deployer;

    // Payable contrcutor
    constructor() payable {
        require(
            msg.value >= 1 ether,
            "Contract should be initialized with at least 1 ether"
        );
        deployer = msg.sender;
    }

    function withdraw() public {
        require(
            msg.sender == deployer,
            "Only the creator of the contract can call this function"
        );
        // Send all available ether from this contract to the deployer
        (bool success, ) = deployer.call{value: address(this).balance}("");
        require(success, "transaction failed");
    }
}
