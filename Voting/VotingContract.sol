// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Voting {
    enum voteState {
        Absent,
        Yes,
        No
    }

    event VoteCast(uint256 proposalId, address indexed voterAddress);
    event ProposalCreated(uint proposalId);

    mapping(address => bool) allowedToVote;

    struct Proposal {
        mapping(address => voteState) voterDecision;
        address target;
        bytes data;
        uint yesCount;
        uint noCount;
    }

    Proposal[] public proposals;

    modifier onlyAllowedMembersToVote() {
        require(
            allowedToVote[msg.sender] == true,
            "You are not allowed to participate."
        );
        _;
    }

    constructor(address[] memory eligibleToVote) {
        allowedToVote[msg.sender] = true;

        for (uint256 i = 0; i < eligibleToVote.length; i++) {
            allowedToVote[eligibleToVote[i]] = true;
        }
    }

    function newProposal(
        address targetOfProposal,
        bytes calldata proposalCalldata
    ) external onlyAllowedMembersToVote {
        emit ProposalCreated(proposals.length);
        Proposal storage proposal = proposals.push();
        proposal.target = targetOfProposal;
        proposal.data = proposalCalldata;
    }

    function castVote(
        uint256 proposalId,
        bool voteDecision
    ) external onlyAllowedMembersToVote {
        if (proposals[proposalId].voterDecision[msg.sender] == voteState.Yes) {
            proposals[proposalId].yesCount--;
        }
        if (proposals[proposalId].voterDecision[msg.sender] == voteState.No) {
            proposals[proposalId].noCount--;
        }
        if (voteDecision == true) {
            proposals[proposalId].yesCount += 1;
        } else {
            proposals[proposalId].noCount += 1;
        }

        proposals[proposalId].voterDecision[msg.sender] = voteDecision
            ? voteState.Yes
            : voteState.No;
        emit VoteCast(proposalId, msg.sender);

        if (proposals[proposalId].yesCount >= 10) {
            (bool success, ) = proposals[proposalId].target.call(
                proposals[proposalId].data
            );
            require(success, "Proposal sending failed");
        }
    }
}
