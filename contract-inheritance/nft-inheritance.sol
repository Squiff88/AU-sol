// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is Ownable {
    // Defining a function that can be overriden by children
    function transfer(address _recipient) public virtual onlyOwner {
        owner = recipient;
    }
}

contract TimeLockedNFT is NFT {
    uint lastTransfer;

    // Overrides a parent function
    function transfer(address _recipient) public override onlyOwner {
        // cannot transfer if last transfer was within 10 days
        require(lastTransfer < block.timestamp - 10 days);
        owner = _recipient;
        lastTransfer = block.timestamp;
    }
}

// Example calling SUPER
contract Base {
    uint public value = 10;

    function modify() external virtual {
        value *= 2;
    }
}

contract Derived is Base {
    function modify() external virtual override {
        value += 20;
        super.modify(); // results in value = 60
        // Base.modify() would also work!
    }
}
