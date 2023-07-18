// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// import "./UIntFunctions.sol";

library UIntFunctions {
    function isEven(uint num) public pure returns (bool) {
        return num % 2 == 0;
    }
}

contract Game {
    uint public participants;
    bool public allowTeams;

    // using UIntFunctions for uint;

    constructor(uint256 _participants) {
        participants = _participants;

        // _participants.isEvent();
        allowTeams = UIntFunctions.isEven(_participants);
    }
}
