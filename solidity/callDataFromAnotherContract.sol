interface IToken {
    function getBalance(address user) external;
}

// tokenAddress: a contract adddress we want to communicate with
// userAddress: the address we want to lookup the balance for
uint balance = IToken(tokenAddress).getBalance(userAddress);


// CALLING A FUNCTION WITH MANUAL CALLDATA

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Sidekick {
    function sendAlert(address hero) external {
        // TODO: fill in the function signature
        // Take the first 4 bytes of the function signature
        bytes4 signature = bytes4(keccak256("alert()"));
        // Call the contract with tthe function signature
        (bool success, ) = hero.call(abi.encodePacked(signature));

        require(success, 'Transaction failed');
    }
}


// Send manual calldata with encodeWithSignature function

bytes memory payload = abi.encodeWithSignature("rumble(uint256,uint256)", 10, 5);

(bool success, ) = hero.call(payload);


// ANOTHER EXAMPLE

contract Sidekick {
    function sendAlert(address hero, uint enemies, bool armed) external {
        bytes memory heroCalling = abi.encodeWithSignature("alert(uint256,bool)", enemies, armed);
        (bool success, ) = hero.call(heroCalling);

        require(success);
    }
}