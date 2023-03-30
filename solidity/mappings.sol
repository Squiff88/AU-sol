// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// Simple Mappings
contract Contract {
    mapping(address => bool) public members;

    function addMember(address memberAddress) external {
        members[memberAddress] = true;
    }

    function isMember(address memberAddress) external view returns (bool) {
        return members[memberAddress];
    }

    function removeMember(address memberAddress) external {
        members[memberAddress] = false;
    }
}

// Mappings with Structs

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    struct User {
        uint balance;
        bool isActive;
    }

    mapping(address => User) public users;

    function createUser() external {
        require(!users[msg.sender].isActive, "user already exists");

        User storage newUser = users[msg.sender];

        newUser.balance += 100;
        newUser.isActive = true;
    }

    function transfer(address recipient, uint256 amount) external {
        require(users[msg.sender].isActive, "Not an active user");
        require(users[recipient].isActive, "Recipient is not an active user");
        require(
            users[msg.sender].balance >= amount,
            "Not enough funds available"
        );

        User storage recipientUser = users[recipient];
        User storage senderUser = users[msg.sender];

        recipientUser.balance += amount;
        senderUser.balance -= amount;
    }
}

// NESTED MAPPINGS WITH ENUMS

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    enum ConnectionTypes {
        Unacquainted,
        Friend,
        Family
    }

    // TODO: create a public nested mapping `connections`
    mapping(address => mapping(address => ConnectionTypes)) public connections;

    function connectWith(
        address other,
        ConnectionTypes connectionType
    ) external {
        // TODO: make the connection from msg.sender => other => connectionType
        connections[msg.sender][other] = connectionType;
    }
}
