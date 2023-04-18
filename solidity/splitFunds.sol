// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "hardhat/console.sol";

contract Party {
    uint256 private partyDeposit;

    uint256 totalPartyParticipantsCount;

    struct partyRVSP {
        address partyAddress;
        uint256 partyDeposit;
    }

    mapping(address => uint256) partyAddresses;
    mapping(uint256 => partyRVSP) partyParticipantsMapping;

    constructor(uint256 _partyDeposit) {
        totalPartyParticipantsCount = 0;
        partyDeposit = _partyDeposit;
    }

    function checkPartyAddressExists(
        address _partyAddress
    ) internal view returns (bool) {
        bool partyAddressExists = false;

        for (uint256 i = 0; i <= totalPartyParticipantsCount; i++) {
            if (partyParticipantsMapping[i].partyAddress == _partyAddress) {
                partyAddressExists = true;
            }
        }

        return partyAddressExists;
    }

    function rsvp() external payable {
        require(
            msg.value == partyDeposit,
            "Amount for party deposit is not correct"
        );
        require(
            !checkPartyAddressExists(msg.sender),
            "Address already joined the party !"
        );

        partyParticipantsMapping[totalPartyParticipantsCount].partyAddress = msg
            .sender;
        partyParticipantsMapping[totalPartyParticipantsCount].partyDeposit = msg
            .value;

        totalPartyParticipantsCount += 1;
    }

    function payBill(address _venueAddress, uint256 totalCost) external {
        (bool success, ) = _venueAddress.call{value: totalCost}("");

        require(success, "Transaction failed");

        // AFTER PAYING THE TOTAL COST , SPLIT THE REMAINDER OF CONTRACT FUNDS TO THE PARTICIPANTS
        uint256 singleParticipantRefundValue = address(this).balance /
            (totalPartyParticipantsCount);

        for (uint256 i = 0; i < totalPartyParticipantsCount; i++) {
            (bool successRefund, ) = partyParticipantsMapping[i]
                .partyAddress
                .call{value: singleParticipantRefundValue}("");
            require(successRefund, "Refund failed");
        }
    }
}
