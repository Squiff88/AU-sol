import "hardhat/console.sol";

// EXAMPLE 1

contract A {
    function setValueOnB(address b) external {
        // Call storeValue via call method
        (bool s, ) = b.call(abi.encodeWithSignature("storeValue(uint256)", 22));
        require(s);
    }
}

// EXAMPLE 2

contract A {
    function setValueOnB(address b) external {
        // Access contract B and invoke storeValue function
        B(b).storeValue(22);
    }
}

// EXAMPLE 3

// If we dont have access to contract B directly, we can create an interface
interface B {
    function storeValue(uint256) external;
}

// Call the storeValue function the same way via Interface of B
contract A {
    function setValueOnB(address b) external {
        B(b).storeValue(22);
    }
}

contract B {
    uint x;

    function storeValue(uint256 _x) external {
        x = _x;
        console.log(x); // 22
    }
}
