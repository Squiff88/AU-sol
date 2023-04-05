contract Library {
    struct Book {
        string title;
        string author;
        uint bookId;
        address registrant;
    }

    Book[] public books;

    function addBook(string memory _title, string memory _author) public {
        // whoever adds a book, that is the registrant on this book
        books.push(Book(_title, _author, books.length, msg.sender));
    }

    function get(
        uint _bookId
    ) public view returns (string memory _title, string memory _author) {
        return (books[_bookId].title, books[_bookId].author);
    }

    function update(
        uint _bookId,
        string memory _newTitle,
        string memory _newAuthor
    ) public {
        // protect our book record by only making
        // this function available to the original registrant
        require(
            msg.sender == books[_bookId].registrant,
            "You must have been the one to add the book to change the record!"
        );

        books[_bookId].title = _newTitle;
        books[_bookId].author = _newAuthor;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Contract {
    enum Choices {
        Yes,
        No
    }

    struct Vote {
        Choices choice;
        address voter;
    }

    Vote public vote;

    // TODO: create a vote struct and a public state variable

    function createVote(Choices choice) external {
        // TODO: create a new vote
        vote = Vote(choice, msg.sender);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;
// Can handle structs as function parameters and return types !!!!
pragma experimental ABIEncoderV2;

contract Contract {
    enum Choices {
        Yes,
        No
    }

    struct Vote {
        Choices choice;
        address voter;
    }

    // TODO: make a new createVote function

    function createVote(Choices choice) external view returns (Vote memory) {
        Vote memory vote = Vote(choice, msg.sender);
        return vote;
    }
}

// ARRAY OF STRUCTS !!!

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

    // TODO: create a public state variable: an array of votes

    function createVote(Choices choice) external {
        // TODO: add a new vote to the array of votes state variable
        votes.push(Vote(choice, msg.sender));
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
        // Assign default values to the struct
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

        // Check if the found vote is diff from default address
        if (voteFound.voter != address(0)) {
            voterHasVoted = true;
        }

        return voterHasVoted;
    }

    function findChoice(
        address votedChoiceAddress
    ) external view returns (Choices) {
        Choices choiceMade;
        Vote memory voteFound = findVoterAddress(votedChoiceAddress);

        // Check if the found vote is diff from default address
        if (voteFound.voter != address(0)) {
            choiceMade = voteFound.choice;
        }

        return choiceMade;
    }

    function createVote(Choices choice) external {
        // TODO: add a new vote to the array of votes state variable
        votes.push(Vote(choice, msg.sender));
    }
}
