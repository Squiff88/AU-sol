// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Ownable {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
}

contract Transferable is Ownable {
    function transfer(address newOwner) external onlyOwner {
        owner = newOwner;
    }
}

contract Collectible is Ownable, Transferable {
    uint public price;

    function markPrice(uint _price) external onlyOwner {
        price = _price;
    }
}
