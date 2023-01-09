class MerkleTree {
  constructor(leaves, concat) {
    this.concat = concat;
    this.leaves = leaves;
  }
  getRoot(layer = this.leaves, singleLeave = null) {
    const pairValues = [];
    layer.map((leave, i) => {
      const flattenPairs = pairValues.flatMap((val) => val);
      if (i + 1 <= layer.length - 1) {
        if (flattenPairs.every((val) => val !== leave)) {
          pairValues.push([leave, layer[i + 1]]);
        }
        console.log(i, leave, layer[i + 1], "leave heer");
      } else if (flattenPairs.every((val) => val !== leave)) {
        console.log(leave, "123 leave heer");
        pairValues.push([leave]);
      }
    });

    let bottomLayer = pairValues.map((pairs, i) => {
      console.log(pairValues, "pari values ?? ? ");
      if (pairs.length % 2 === 0) {
        return this.concat(pairs[0], pairs[1]);
      } else {
        return pairs;
      }
    });

    console.log(bottomLayer, "bottomLayer ????");
    // handle the case of single leave leftover ( odd tree structure )
    if (singleLeave) {
      bottomLayer = [...bottomLayer, ...singleLeave];
    }

    if (bottomLayer.length % 2 === 0) {
      console.log("recursive !!!");
      bottomLayer = this.getRoot(bottomLayer);
    } else if (bottomLayer.length > 1) {
      bottomLayer = this.getRoot(
        [bottomLayer[0], bottomLayer[1]],
        bottomLayer[2]
      );
    }

    console.log(bottomLayer, "after bottomLayer ????");
    return bottomLayer;
  }

  getProof(i) {
    console.log(this.leaves[i], "leaves i mainas");

    const proofArr = [];
    const pairValues = [];

    // If the next pair values include the target node , do not combine it !!!
    const targetNode = this.leaves[i];
    let counter = 0;

    const pairValuesHandler = (arrOfValues = this.leaves) => {
      const targetIndex = proofArr.length === 0 ? i : idx;

      const leftNode = targetIndex % 2 === 0;

      const proofObj = { data: "", left: !leftNode };

      if (leftNode) {
        proofObj.data = arrOfValues[targetIndex + 1];
      } else {
        proofObj.data = arrOfValues[targetIndex - 1];
      }

      proofArr.push(proofObj);

      arrOfValues.map((leave, idx) => {
        console.log(arrOfValues[targetIndex], leftNode, "leftNode is it ????");
        console.log(idx, i, "index leftNode is it ????");

        const flattenPairs = pairValues.flatMap((val) => val);
        // Exclude target node and its pair from array of next pairs
        if (
          idx === i ||
          (leftNode && idx - 1 === i) ||
          (!leftNode && idx + 1 === i)
        ) {
          return null;
        }
        if (idx + 1 <= arrOfValues.length - 1) {
          // POSSIBLY PUSH NODES ONLY FROM RIGHT SIDE AND ARRANGE
          // THE PAIR ARRAYS IN A WAY THAT THE MERKLE TREE SHOULD BE MERGED
          // if (idx + 1 <= arrOfValues.length - 1 && (leftNode && ((idx - 1) > i || !leftNode && idx + 1 > i))) {
          console.log(leave, "1");
          let arrCounter = 0;
          if (flattenPairs.every((val) => val !== leave)) {
            pairValues[arrCounter] = [leave, arrOfValues[idx + 1]];
            // pairValues.unshift([leave, arrOfValues[idx + 1]]);
            // console.log(arrCounter, 'counting arrs')
            // console.log(idx, 'idx arrs')
            // console.log(i, 'just i arrs')
            arrCounter++;
          }
          // console.log(i, leave, layer[i + 1], 'leave heer')
        } else if (flattenPairs.every((val) => val !== leave)) {
          console.log(leave, "2");
          pairValues.push([leave]);
        }
      });
    };

    console.log(pairValues, "pair values here ???  ");
    if (pairValues.length <= 1) {
      pairValuesHandler();
      console.log(pairValues, "666666 pair values maina");
      const shouldCombineNext = counter * 2;

      // Should itterate through pair values and combine the next {shouldCombineNext} number of pairs - e.g shouldCombineNext = 2 then combine  EF and GH
      // If the array length is less than the needed go from the beggining of the array and try to find it there

      console.log(pairValues[counter].join(""), "arr left");
      console.log(counter, "counter pair values maina");
    } else {
      console.log("else........");
      pairValuesHandler(pairValues);
    }

    counter++;
    console.log(proofArr, "proof mainas");

    // console.log(proofArr, 'arr i mainas')
    // console.log(this.leaves, 'leaves i mainas')
    // console.log(pairValues, 'kanq')

    // const root = this.getRoot(this.leaves);
    // console.log(root, 'root i mainas')
    return proofArr;
  }
}

module.exports = MerkleTree;

// AFTER CHANGING TO RECURSION

class MerkleTree {
  constructor(leaves, concat) {
    this.concat = concat;
    this.leaves = leaves;
    this.proofArray = [];
  }
  getRoot(layer = this.leaves, singleLeave = null) {
    const pairValues = [];
    layer.map((leave, i) => {
      const flattenPairs = pairValues.flatMap((val) => val);
      if (i + 1 <= layer.length - 1) {
        if (flattenPairs.every((val) => val !== leave)) {
          pairValues.push([leave, layer[i + 1]]);
        }
        console.log(i, leave, layer[i + 1], "leave heer");
      } else if (flattenPairs.every((val) => val !== leave)) {
        console.log(leave, "123 leave heer");
        pairValues.push([leave]);
      }
    });

    let bottomLayer = pairValues.map((pairs, i) => {
      console.log(pairValues, "pari values ?? ? ");
      if (pairs.length % 2 === 0) {
        return this.concat(pairs[0], pairs[1]);
      } else {
        return pairs;
      }
    });

    console.log(bottomLayer, "bottomLayer ????");
    // handle the case of single leave leftover ( odd tree structure )
    if (singleLeave) {
      bottomLayer = [...bottomLayer, ...singleLeave];
    }

    if (bottomLayer.length % 2 === 0) {
      console.log("recursive !!!");
      bottomLayer = this.getRoot(bottomLayer);
    } else if (bottomLayer.length > 1) {
      bottomLayer = this.getRoot(
        [bottomLayer[0], bottomLayer[1]],
        bottomLayer[2]
      );
    }

    console.log(bottomLayer, "after bottomLayer ????");
    return bottomLayer;
  }

  getProof(i, arrOfValues = this.leaves, nextElementIdx = i) {
    console.log(this.leaves[i], "leaves i mainas");

    const pairValues = [];

    // If the next pair values include the target node , do not combine it !!!
    const targetNode = this.leaves[i];
    let counter = 0;

    const targetIndex = this.proofArray.length === 0 ? i : nextElementIdx;

    const leftNode = targetIndex % 2 === 0;

    const proofObj = { data: "", left: !leftNode };

    if (leftNode) {
      proofObj.data = arrOfValues[targetIndex + 1];
    } else {
      proofObj.data = arrOfValues[targetIndex - 1];
    }

    this.proofArray.push(proofObj);

    arrOfValues.map((leave, idx) => {
      console.log(arrOfValues[targetIndex], leftNode, "leftNode is it ????");
      console.log(idx, i, "index leftNode is it ????");

      const flattenPairs = pairValues.flatMap((val) => val);
      // Exclude target node and its pair from array of next pairs
      if (
        idx === i ||
        (leftNode && idx - 1 === i) ||
        (!leftNode && idx + 1 === i)
      ) {
        return null;
      }
      if (idx + 1 <= arrOfValues.length - 1) {
        // POSSIBLY PUSH NODES ONLY FROM RIGHT SIDE AND ARRANGE
        // THE PAIR ARRAYS IN A WAY THAT THE MERKLE TREE SHOULD BE MERGED
        // if (idx + 1 <= arrOfValues.length - 1 && (leftNode && ((idx - 1) > i || !leftNode && idx + 1 > i))) {
        console.log(leave, "1");
        let arrCounter = 0;
        if (flattenPairs.every((val) => val !== leave)) {
          pairValues.push([leave, arrOfValues[idx + 1]]);
          // pairValues[arrCounter] = [leave, arrOfValues[idx + 1]];
          // pairValues.unshift([leave, arrOfValues[idx + 1]]);
          // console.log(arrCounter, 'counting arrs')
          // console.log(idx, 'idx arrs')
          // console.log(i, 'just i arrs')
          arrCounter++;
        }
        // console.log(i, leave, layer[i + 1], 'leave heer')
      } else if (flattenPairs.every((val) => val !== leave)) {
        console.log(leave, "2");
        pairValues.push([leave]);
      }
    });

    console.log(pairValues, "pair values here ???  ");
    if (pairValues.length <= 1) {
      console.log(pairValues, "666666 pair values maina");
      const shouldCombineNext = counter * 2;

      // Should itterate through pair values and combine the next {shouldCombineNext} number of pairs - e.g shouldCombineNext = 2 then combine  EF and GH
      // If the array length is less than the needed go from the beggining of the array and try to find it there
      const joinFirstElement = pairValues[counter].join("");
      pairValues[counter] = [joinFirstElement];

      console.log(pairValues[counter].join(""), "arr left");
      console.log(counter, "counter pair values maina");
      console.log(pairValues, "pairValues values maina");
    }

    counter++;
    console.log(this.proofArray, "proof mainas");

    // console.log(this.proofArray, 'arr i mainas')
    // console.log(this.leaves, 'leaves i mainas')
    // console.log(pairValues, 'kanq')

    // const root = this.getRoot(this.leaves);
    // console.log(root, 'root i mainas')
    return this.proofArray;
  }
}

module.exports = MerkleTree;
