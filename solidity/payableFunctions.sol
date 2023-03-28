// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    address public owner;
    address charity;

    constructor(address _charity) {
        owner = msg.sender;
        charity = _charity;
    }

    // Fallback like function to receive ether which goes automatically to the contract vault
    receive() external payable {}

    function tip() public payable {
        (bool success, ) = owner.call{value: msg.value}("");
        require(success);
    }

    function donate() public {
        // Transfer all available ETH from this contract to the charity address
        (bool success, ) = charity.call{value: address(this).balance}("");
        require(success);

        // SELFDESTRUCT WILL TRANSFER ALL THE REMAINING ETH IN THE CONTRACT TO A SPECIFIED ADDRESS
        // selfdestruct(payable(charity));
    }
}
