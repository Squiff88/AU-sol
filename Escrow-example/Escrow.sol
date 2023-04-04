// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Escrow {
    address public depositor;
    address public beneficiary;
    address public arbiter;
    bool public isApproved = false;

    event Approved(uint256 amount);

    modifier arbiterApproved() {
        require(
            arbiter == msg.sender,
            "Only arbiter has access to this functionality"
        );
        _;
    }

    constructor(address _arbiter, address _beneficiary) payable {
        depositor = msg.sender;
        beneficiary = _beneficiary;
        arbiter = _arbiter;
    }

    function approve() external arbiterApproved {
        uint256 approvedAmount = address(this).balance;
        (bool success, ) = beneficiary.call{value: approvedAmount}("");
        require(success, "Transaction failed");

        emit Approved(approvedAmount);

        isApproved = true;
    }
}
