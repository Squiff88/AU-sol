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
      } else if (flattenPairs.every((val) => val !== leave)) {
        pairValues.push([leave]);
      }
    });

    let bottomLayer = pairValues.map((pairs, i) => {
      if (pairs.length % 2 === 0) {
        return this.concat(pairs[0], pairs[1]);
      } else {
        return pairs;
      }
    });

    // handle the case of single leave leftover ( odd tree structure )
    if (singleLeave) {
      bottomLayer = [...bottomLayer, ...singleLeave];
    }

    if (bottomLayer.length % 2 === 0) {
      bottomLayer = this.getRoot(bottomLayer);
    } else if (bottomLayer.length > 1) {
      bottomLayer = this.getRoot(
        [bottomLayer[0], bottomLayer[1]],
        bottomLayer[2]
      );
    }

    return bottomLayer;
  }

  getProof(i) {
    const proofArray = [];
    const pairValues = [];
    const arrOfValues = this.leaves;
    let targetIndex = i;

    // After the first iteration find the next pair that includes the first found node
    // if (proofArr.length > 0) {
    //   const findNode = (element) => element.includes(proofArr[0].data);
    //   targetIndex = arrOfValues.findIndex(findNode);
    // }

    // If the target element is on the left side , its pair should be on the right and vice versa
    const leftNode = targetIndex % 2 === 0;

    const proofObj = { data: "", left: !leftNode };

    if (leftNode && arrOfValues[targetIndex + 1]) {
      proofObj.data = arrOfValues[targetIndex + 1];
    } else if (arrOfValues[targetIndex - 1]) {
      proofObj.data = arrOfValues[targetIndex - 1];
    }

    if (proofObj.data && proofObj.data.length > 0) {
      proofArray.push(proofObj);
    }

    arrOfValues.map((leave, idx) => {
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
        pairValues.push(leave);
      }
    });

    // Call recursively the function until only 2 elements are left before the root
    // if (arrOfValues.length > 2) {
    //   this.getProof(i, pairValues, proofArray);
    // }

    console.log(proofArray, "FINAL");

    return proofArray;
  }

  // getProof(index) {
  //   let proof = [];

  //   let copyLeave = this.leaves.map((x) => x);

  //   while (copyLeave.length > 1) {
  //     if (index % 2 == 0) {
  //       if (index == copyLeave.length - 1 && copyLeave.length % 2 != 0) {
  //         //do nothing
  //       } else {
  //         proof.push({ data: copyLeave[index + 1], left: false });
  //       }
  //     } else {
  //       proof.push({ data: copyLeave[index - 1], left: true });
  //       index--;
  //     }

  //     index = index / 2;

  //     for (let i = 0; i < copyLeave.length; i++) {
  //       if (i + 1 < copyLeave.length) {
  //         copyLeave.splice(i, 2, this.concat(copyLeave[i], copyLeave[i + 1]));
  //       }
  //     }
  //   }
  //   console.log(proof, "proof maina");
  //   return proof;
  // }
}

module.exports = MerkleTree;
