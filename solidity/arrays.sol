// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Contract {
    // Fixed sized array as fun argument;
    // Calldata refers to the array being taken as external property
    function sum(uint[5] calldata numbers) external pure returns (uint) {
        uint sumOfNumbers;

        for (uint i = 0; i < numbers.length; i++) {
            sumOfNumbers += numbers[i];
        }

        return sumOfNumbers;
    }
}

// FILTER ARRAY

// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Contract {
    uint256[] public evenNumbers;

    function filterEven(uint256[] calldata arrayOfNumbers) public {
        for (uint256 i = 0; i < arrayOfNumbers.length; i++) {
            if (arrayOfNumbers[i] % 2 == 0) {
                evenNumbers.push(arrayOfNumbers[i]);
            }
        }
    }
}

// Filter IN-MEMORY array

// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Contract {
    function filterEven(
        uint256[] calldata numbers
    ) external pure returns (uint256[] memory) {
        uint256 numberOfElements = 0;

        // Find the number of elements to be stored in the in memory array
        for (uint256 i = 0; i < numbers.length; i++) {
            if (numbers[i] % 2 == 0) {
                numberOfElements++;
            }
        }
        // In memory arrays don't have push method
        // Size should be determined on initialization
        // Assign numberOfElements to the in memory array
        uint256[] memory filteredNumbers = new uint[](numberOfElements);

        // Have to handle the array index manually as well
        uint256 filteredElementsIdx = 0;

        for (uint256 i = 0; i < numbers.length; i++) {
            if (numbers[i] % 2 == 0) {
                filteredNumbers[filteredElementsIdx] = numbers[i];
                filteredElementsIdx++;
            }
        }

        return filteredNumbers;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract StackClub {
    address[] members;

    constructor() {
        members.push(msg.sender);
    }

    function addMember(address memberAddress) external {
        require(
            isMember(msg.sender),
            "Only members can access this functionality"
        );
        members.push(memberAddress);
    }

    function removeLastMember() public {
        require(
            isMember(msg.sender),
            "Only members can access this functionality"
        );

        members.pop();
    }

    function isMember(address checkAddress) public view returns (bool) {
        bool memberFound = false;
        for (uint i; i < members.length; i++) {
            if (members[i] == checkAddress) {
                memberFound = true;
            }
        }
        return memberFound;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Contract {
    enum Choices {
        Yes,
        No
    }

    Vote[] public votes;

    struct Vote {
        Choices choice;
        address voter;
    }

    function findVoterAddress(
        address voterAddress
    ) internal view returns (Vote memory) {
        Vote memory foundVoter = Vote(Choices(0), address(0));
        for (uint256 i = 0; i < votes.length; i++) {
            if (votes[i].voter == voterAddress) {
                foundVoter = votes[i];
            }
        }

        return foundVoter;
    }

    // TODO: create a public state variable: an array of votes

    function hasVoted(address voterAddress) public view returns (bool) {
        bool voterHasVoted = false;
        Vote memory voteFound = findVoterAddress(voterAddress);

        if (voteFound.voter != address(0)) {
            voterHasVoted = true;
        }

        return voterHasVoted;
    }

    function findChoice(
        address votedChoiceAddress
    ) public view returns (Choices) {
        Choices choiceMade;
        Vote memory voteFound = findVoterAddress(votedChoiceAddress);

        if (voteFound.voter != address(0)) {
            choiceMade = voteFound.choice;
        }

        return choiceMade;
    }

    function createVote(Choices choice) external {
        // TODO: add a new vote to the array of votes state variable
        bool alreadyVoted = hasVoted(msg.sender);

        require(!alreadyVoted, "You have already voted !");
        votes.push(Vote(choice, msg.sender));
    }

    function changeVote(Choices choice) external {
        bool alreadyVoted = hasVoted(msg.sender);

        require(alreadyVoted, "No available vote detected");

        for (uint256 i = 0; i < votes.length; i++) {
            if (votes[i].voter == msg.sender) {
                votes[i].choice = choice;
            }
        }
    }
}
