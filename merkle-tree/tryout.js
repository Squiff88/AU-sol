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

  getProof(i, arrOfValues = this.leaves, proofCounter = 0, proofArr = []) {
    console.log(i, "indexxxx i mainas");
    console.log(arrOfValues, "leaves i mainas");
    console.log(proofCounter, "proofCounter i mainas");
    const proofArray = proofArr;
    const pairValues = [];

    // If the next pair values include the target node , do not combine it !!!
    let counter = proofCounter;

    // const targetIndex = proofArray.length === 0 ? i : nextElementIdx;
    const targetIndex = i;

    const leftNode = targetIndex % 2 === 0;

    const proofObj = { data: "", left: !leftNode };

    if (leftNode && arrOfValues[targetIndex]) {
      proofObj.data =
        proofCounter === 0
          ? arrOfValues[targetIndex + 1]
          : arrOfValues[targetIndex];
    } else if (arrOfValues[targetIndex]) {
      proofObj.data =
        proofCounter === 0
          ? arrOfValues[targetIndex - 1]
          : arrOfValues[targetIndex];
    }

    if (proofObj.data.length > 0) {
      proofArray.push(proofObj);
    }

    console.log(proofArray, "[roof arr] i mainasmainas");

    arrOfValues.map((leave, idx) => {
      // Exclude target node and its pair from array of next pairs
      if (
        idx === i ||
        (leftNode && idx - 1 === i && proofCounter === 0) ||
        (!leftNode && idx + 1 === i && proofCounter === 0)
      ) {
        console.log(leave, "return null !!!!!");
        return null;
      }
      if (idx + 1 <= arrOfValues.length - 1) {
        // POSSIBLY PUSH NODES ONLY FROM RIGHT SIDE AND ARRANGE
        // THE PAIR ARRAYS IN A WAY THAT THE MERKLE TREE SHOULD BE MERGED
        console.log(leave, "kanqqq ____________________");
        if (
          pairValues.every((val) => {
            return val !== leave && !val.includes(leave);
          })
        ) {
          const concatIt = leave + arrOfValues[idx + 1];
          console.log(concatIt, "MAINAAAA !!!!!!! _________");
          console.log(leave, "LEAVE IT MAINAAAAA");
          console.log(123, "LEAVE IT MAINAAAAA");
          pairValues.push(leave);
        }
      } else if (
        pairValues.every((val) => val !== leave && !val.includes(leave))
      ) {
        pairValues.push(leave);
      }
    });

    const shouldCombineNext = counter * 2;

    // Should itterate through pair values and combine the next {shouldCombineNext} number of pairs - e.g shouldCombineNext = 2 then combine  EF and GH
    // If the array length is less than the needed go from the beggining of the array and try to find it there

    if (pairValues[counter]) {
      // console.log(pairValues, 'pair values ')
      // console.log(counter, 'counter values ')
      // const joinFirstElement = pairValues[counter].join("");
      // console.log(joinFirstElement, 'first element values ')
      // pairValues[counter] = [joinFirstElement];
    }

    counter++;
    console.log(proofArray, "before recursion arr i mainasmainas");
    console.log(arrOfValues, "array beore recursion >>>>");

    if (arrOfValues.length > 2) {
      this.getProof(i, pairValues, counter, proofArray);
    }

    // proofArray.flatMap(e => e);
    // console.log(this.leaves, 'leaves i mainas')
    // console.log(pairValues, 'kanq')

    console.log(proofArray, "RETURNING PROOF");
    // const root = this.getRoot(this.leaves);
    // console.log(root, 'root i mainas')
    return proofArray;
  }
}

module.exports = MerkleTree;
