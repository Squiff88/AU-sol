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

    struct Proposal {
        mapping(address => voteState) voterDecision;
        address target;
        bytes data;
        uint yesCount;
        uint noCount;
    }

    Proposal[] public proposals;

    function newProposal(
        address targetOfProposal,
        bytes calldata proposalCalldata
    ) external {
        emit ProposalCreated(proposals.length);
        Proposal storage proposal = proposals.push();
        proposal.target = targetOfProposal;
        proposal.data = proposalCalldata;
    }

    function castVote(uint256 proposalId, bool voteDecision) external {
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
    }
}
