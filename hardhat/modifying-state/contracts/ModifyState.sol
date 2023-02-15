//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract ModifyState {
    uint public x;
    string public greet;

    constructor(uint _x, string memory _greet) {
        x = _x;
        greet = _greet;
    }

    function modifyToLeet() public {
        x = 1337;
    }

    function modifyGreet(string calldata _greet) public {
        greet = _greet;
    }
}
