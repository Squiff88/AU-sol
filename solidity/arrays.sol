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
