// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

interface Enemy {
    function takeAttack(Hero.AttackTypes attackType) external;
}

abstract contract Hero {
    uint public health;
    uint public energy = 10;

    enum AttackTypes {
        Brawl,
        Spell
    }

    constructor(uint _health) {
        health = _health;
    }

    function takeDamage(uint damage) external {
        health -= damage;
    }

    function attack(address) public virtual {
        energy--;
    }
}

// Inherits ABSTRACT contract Hero
contract Mage is Hero(50) {
    // Implements VIRTUAL function which is overriden in this instance of the contract
    function attack(address enemyAddress) public override {
        // Implements the INTERFACE of Enemy
        Enemy enemy = Enemy(enemyAddress);
        // Implements the Enemy interface function takeAttack
        enemy.takeAttack(Hero.AttackTypes.Spell);

        // Calling the Base Contract attack implementation
        super.attack(msg.sender);
    }
}

contract Warrior is Hero(200) {
    function attack(address enemyAddress) public override {
        Enemy enemy = Enemy(enemyAddress);
        enemy.takeAttack(Hero.AttackTypes.Brawl);

        // Calling the Base Contract attack implementation
        super.attack(msg.sender);
    }
}
