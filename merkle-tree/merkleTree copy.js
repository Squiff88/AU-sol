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

  getProof(i, arrOfValues = this.leaves, proofArr = []) {
    console.log(arrOfValues, "leaves i mainas");
    const proofArray = proofArr;
    const pairValues = [];

    // If the next pair values include the target node , do not combine it !!!

    let targetIndex = i;

    if (proofArr.length > 0) {
      const findNode = (element) => element.includes(proofArr[0].data);
      targetIndex = arrOfValues.findIndex(findNode);
    }

    const leftNode = targetIndex % 2 === 0;

    console.log(targetIndex, "targetIndex maina");
    console.log(leftNode, "leftNode maina");
    console.log(arrOfValues[targetIndex], "target leaves i mainas");

    const proofObj = { data: "", left: !leftNode };

    if (leftNode && arrOfValues[targetIndex + 1]) {
      console.log("LEFT NODE &&& COUNTER 0");
      proofObj.data = arrOfValues[targetIndex + 1];
    } else if (arrOfValues[targetIndex - 1]) {
      console.log("RIGHT NODE &&& COUNTER 0");
      proofObj.data = arrOfValues[targetIndex - 1];
    }

    console.log(proofObj, "PROOF OBJ BEFORE PUSH HERE &&&&&&&&");

    if (proofObj.data && proofObj.data.length > 0) {
      proofArray.push(proofObj);
    }

    console.log(proofArray, "[roof arr] i mainasmainas");

    arrOfValues.map((leave, idx) => {
      // Exclude target node and its pair from array of next pairs
      if (idx + 1 <= arrOfValues.length - 1) {
        if (
          pairValues.every((val) => {
            return val !== leave && !val.includes(leave);
          })
        ) {
          const isBuffer = Buffer.isBuffer(leave);
          const buffElement = [leave, arrOfValues[idx + 1]];
          const concatBuffs = isBuffer ? Buffer.concat(buffElement) : null;
          const concatIt = isBuffer
            ? concatBuffs
            : leave + arrOfValues[idx + 1];

          pairValues.push(concatIt);
        }
      } else if (
        pairValues.every((val) => val !== leave && !val.includes(leave))
      ) {
        console.log("SOLO MAINA %%%%%%%%%%");
        pairValues.push(leave);
      }
    });

    console.log(proofArray, "before recursion arr i mainasmainas");
    console.log(arrOfValues, "array beore recursion >>>>");
    console.log(pairValues, "PAIR BEFORE beore recursion >>>>");

    if (arrOfValues.length > 2) {
      this.getProof(i, pairValues, proofArray);
    }

    console.log(proofArray, "FINAL");

    return proofArray;
  }
}

module.exports = MerkleTree;
