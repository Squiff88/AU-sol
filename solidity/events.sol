// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Collectible {
    event Deployed(address indexed deployerAddress);
    event Transfer(address indexed, address indexed);
    event ForSale(uint256 price, uint256 time);
    event Purchase(uint256 price, address indexed buyerAddress);

    address collectibleOwner;
    uint256 collectiblePrice = 0;

    constructor() {
        collectibleOwner = msg.sender;
        emit Deployed(msg.sender);
    }

    function transfer(address recipient) external {
        require(
            collectibleOwner == msg.sender,
            " Only the owner can tranfer this collectible"
        );

        collectibleOwner = recipient;

        emit Transfer(msg.sender, recipient);
    }

    function markPrice(uint256 price) external {
        require(
            collectibleOwner == msg.sender,
            "Only the owner can trigger this function"
        );

        collectiblePrice = price;

        emit ForSale(price, block.timestamp);
    }

    function purchase() external payable {
        require(collectiblePrice > 0, "Collectible not for sale !");
        require(
            msg.value == collectiblePrice,
            "Value does not match the collectible price"
        );
        (bool success, ) = payable(collectibleOwner).call{value: msg.value}("");
        require(success, "Transfer failed");

        collectibleOwner = msg.sender;

        emit Purchase(msg.value, msg.sender);
        collectiblePrice = 0;
    }
}
