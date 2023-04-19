// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "hardhat/console.sol";

contract MultiSig {
    address[] public owners;
    uint256 public required;
    uint256 public transactionCount;

    struct Transaction {
        address beneficiary;
        uint256 transactionValue;
        bool executed;
    }

    mapping(uint256 => Transaction) public transactions;
    mapping(uint256 => mapping(address => bool)) public confirmations;

    constructor(address[] memory _owners, uint256 requiredSignatures) {
        require(_owners.length > 0, "No owner address specified");
        require(
            requiredSignatures > 0,
            "Number of required signatures must be more than 0"
        );
        require(
            _owners.length > requiredSignatures,
            "Number of required signatures is greater than number of owners"
        );

        owners = _owners;
        required = requiredSignatures;
    }

    // Receive ETH in Multi-Sig wallet ( contract )
    receive() external payable {}

    function addTransaction(
        address _beneficiary,
        uint256 value
    ) internal returns (uint256) {
        transactions[transactionCount] = (
            Transaction(_beneficiary, value, false)
        );

        transactionCount += 1;

        // Return the ID of the transaction
        return transactionCount - 1;
    }

    function getConfirmationsCount(
        uint256 transactionId
    ) public view returns (uint256) {
        uint256 confirmedTransactions = 0;

        for (uint256 i = 0; i < owners.length; i++) {
            if (confirmations[transactionId][owners[i]] == true) {
                confirmedTransactions += 1;
            }
        }

        // Return how many confirmations a transaction currently has
        return confirmedTransactions;
    }

    function confirmTransaction(uint256 transactionId) public {
        bool isAddressOwner = false;

        for (uint256 i = 0; i < owners.length; i++) {
            if (owners[i] == msg.sender) {
                isAddressOwner = true;
            }
        }

        require(isAddressOwner, "You are not authorized for this action");

        confirmations[transactionId][msg.sender] = true;

        if (isConfirmed(transactionId)) {
            executeTransaction(transactionId);
        }
    }

    function submitTransaction(address _beneficiary, uint256 value) external {
        confirmTransaction(addTransaction(_beneficiary, value));
    }

    function isConfirmed(uint256 transactionId) public view returns (bool) {
        bool transactionIsConfirmed = false;
        uint256 confirmationCount = getConfirmationsCount(transactionId);

        if (confirmationCount >= required) {
            transactionIsConfirmed = true;
        }

        return transactionIsConfirmed;
    }

    function executeTransaction(uint256 transactionId) public {
        (bool success, ) = transactions[transactionId].beneficiary.call{
            value: transactions[transactionId].transactionValue
        }("");

        require(success, "Transaction failed");

        transactions[transactionId].executed = true;
    }
}
