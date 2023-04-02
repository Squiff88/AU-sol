//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Game4 {
    uint8 y = 210;

    event Winner(address winner);

    function win(uint8 x) public {
        unchecked {
            // HAVE TO OVERFLOW THE VARIABLE SUM WHICH IS UINT8 AND TAKES MAX VALUE OF 255
            // TO ACHIEVE THE GOAL variable X NEEDS TO BE 56 to overflow sum and have a remainder of 10
            uint8 sum = x + y;
            require(sum == 10, "Incorrect argument passed in!");
        }
        emit Winner(msg.sender);
    }
}
