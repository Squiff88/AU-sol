const TrieNode = require("./TrieNode");

function changeValue(target, path, value) {
  for (let idx = 0; idx < path.length - 1; idx++) {
    if (target[path[idx]] && Object.keys(target[path[idx]]).length > 0) {
      if (target[path[idx]] === value) {
        break;
      }

      target = target[path[idx]];
    }
  }
  target[path[path.length - 1]] = value;
}

function addValue(target, path, compare, value, nextKey) {
  const { prev, curr } = compare;

  if (prev === curr) {
    return target;
  }

  for (let idx = 0; idx < path.length - 1; idx++) {
    target = target[path[idx]];

    if (target && target.key === prev && idx !== 0) {
      if (
        target[path[path.length - 1]][curr] !== nextKey &&
        target[path[path.length - 1]][curr] &&
        !target[path[path.length - 1]][curr].isWord
      ) {
        const deepNew = JSON.parse(
          JSON.stringify(target[path[path.length - 1]][curr].children)
        );

        const newObj = Object.assign({}, deepNew, value);

        target[path[path.length - 1]][curr].children = newObj;
      } else if (
        !target[path[path.length - 1]][curr] &&
        target[path[path.length - 1]][prev]
      ) {
        changeValue(target[path[path.length - 1]][prev], path, value);
      } else if (!target.children[curr]) {
        if (!target.children[curr]) {
          target.children[curr] = {
            ...value[curr],
          };
        }
      }
    }
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
    this.keys = [];
  }

  contains(word) {
    return this.keys.some((key, i) => {
      if (key[i]) {
        const letterFromKeys = key[i].filter((letter) => letter !== "children");
        const joinedLetters = letterFromKeys.join("");

        return joinedLetters === word;
      }
      return false;
    });
  }

  insert(word) {
    const wordCharArr = word.split("");
    const patriciaTrie = this.root;
    const keysLen = this.keys.length;
    const patriciaTrieLen = Object.keys(this.root.children).length;

    for (let i = 0; i < wordCharArr.length; i++) {
      // keys.push(wordCharArr[i]);
      if (!this.keys[keysLen]) {
        this.keys[keysLen] = { [keysLen]: [] };
      }
      this.keys[keysLen][keysLen].push(wordCharArr[i]);
      this.keys[keysLen][keysLen].push("children");
      if (i === 0 && patriciaTrieLen === 0) {
        patriciaTrie.children = {
          [wordCharArr[i]]: {
            key: wordCharArr[i],
            isWord: false,
            children: {},
          },
        };
      } else {
        const newNodeRef = {
          [wordCharArr[i]]: {
            key: wordCharArr[i],
            isWord: wordCharArr.length - 1 === i ? true : false,
            children: {},
          },
        };
        // FIND THE LAST CHILDREN NODE AND ATTACH THE PARTIAL OBJECT THERE
        Object.entries(patriciaTrie).map(([key, val]) => {
          if (key === "children") {
            const takePrevKey = [...this.keys[keysLen][keysLen]];
            let sliceIdx = i * 2;
            sliceIdx = sliceIdx === 0 ? 2 : sliceIdx;
            const nextIdx = sliceIdx + 2;

            const slicePrevKey = takePrevKey.slice(0, sliceIdx);

            if (keysLen < 1) {
              changeValue(val, slicePrevKey, newNodeRef);
            }
            if (keysLen >= 1) {
              addValue(
                patriciaTrie.children,
                slicePrevKey,
                { prev: wordCharArr[i - 1], curr: wordCharArr[i] },
                newNodeRef,
                wordCharArr[i]
              );
            }
          }
        });
      }
    }
    console.log(JSON.stringify(patriciaTrie), "patriciaTrie......");
    this.root = patriciaTrie;
  }
}

module.exports = Trie;
