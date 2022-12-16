const express = require("express");
const app = express();
const cors = require("cors");
const { generateThreePKs } = require("./scripts/generate");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const underscore = require("lodash");

app.use(cors());
app.use(express.json());

const balances = {};
const data = {
  user1: {
    wallet: "",
    privateKey: "",
    publicKey: "",
  },
  user2: {
    wallet: "",
    privateKey: "",
    publicKey: "",
  },
  user3: {
    wallet: "",
    privateKey: "",
    publicKey: "",
  },
};

app.get("/wallets", (_, res) => {
  const { pairKey1, pairKey2, pairKey3 } = generateThreePKs();

  data.user1 = { ...pairKey1 };
  data.user2 = { ...pairKey2 };
  data.user3 = { ...pairKey3 };

  balances[data.user1.wallet] = 100;
  balances[data.user2.wallet] = 50;
  balances[data.user3.wallet] = 75;

  const duplicateData = underscore.cloneDeep(data);

  Object.entries(duplicateData).map((entry) => {
    if (entry[1].privateKey) {
      entry[1].privateKey = null;
    }

    return entry;
  });

  res.send(duplicateData);
});

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, nonce } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  const messageHash = keccak256(utf8ToBytes(recipient + amount + nonce));
  // const signMessage = secp.sign(messageHash, )

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
