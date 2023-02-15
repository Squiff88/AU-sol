pragma solidity '0.8.4';

// Implicitly return multiple values
contract MyContract {
    function mathTime(
        uint x,
        uint y
    ) external pure returns (uint _sum, uint _product) {
        _sum = x + y;
        _product = x * y;
    }
};

// Return multiple values
contract MyContract {
    function mathTime(uint sum, uint product) external pure returns(uint, uint) {
        uint sum = x + y;
        uint product = x * y;
        
        return (sum, product);
    }
}
