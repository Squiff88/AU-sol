const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");

// Prepare message for signing by turning the string into an array of hashed bytes
function hashMessage(message) {
  const msgIntoBytes = utf8ToBytes(message);
  const hashedBytes = keccak256(msgIntoBytes);

  return hashedBytes;
}

const PRIVATE_KEY =
  "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";

async function signMessage(msg) {
  // Retrieve the public key by using the private key !
  //   const pubKey = secp.getPublicKey(PRIVATE_KEY);

  // Prepare the msg to be signed by hashing it.
  const hashedMsg = hashMessage(msg);

  // Sign the message with Eliptic Curve Digital Signature Algorith
  // Use the revered option so the function will return the recovery bit to recover the public key !
  const signedMsg = await secp.sign(hashedMsg, PRIVATE_KEY, {
    recovered: true,
  });

  console.log(signedMsg[0], "signedMsg value");
  console.log(signedMsg[1], "signedMsg value");

  return signedMsg;
}

// Retrieve the Public Key

async function recoverPublicKey(message, signature, recoveryBit) {
  const hashedMsg = hashMessage(message);
  const publicKey = await secp.recoverPublicKey(
    hashedMsg,
    signature,
    recoveryBit
  );

  //   console.log(publicKey, "public key ?");
  return publicKey;
}

const execute = async () => {
  const [signature, recoveryBit] = await signMessage("Hello Pal");

  const publicKeyFromSignature = await recoverPublicKey(
    "Hello There",
    signature,
    recoveryBit
  );

  function getWalletAddressFromPublicKey(publicKey) {
    console.log(publicKey, "public key maina ...");
    const firstByteRemoved = publicKey.slice(1);
    const hashRestOfPublicKey = keccak256(firstByteRemoved);
    const addressFromPublicKey = hashRestOfPublicKey.slice(-20);

    return addressFromPublicKey;
  }

  const walletAddressUint8Arr = getWalletAddressFromPublicKey(
    publicKeyFromSignature
  );
  const walletAddress = toHex(walletAddressUint8Arr);

  console.log(walletAddress, "wallet address from public key");
};

signMessage("Hello there");
execute();

module.exports = signMessage;
