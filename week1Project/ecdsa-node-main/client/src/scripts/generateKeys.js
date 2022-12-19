import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

export const generateThreePKs = () => {
  const privateKey1 = toHex(secp.utils.randomPrivateKey());
  const publicKey1 = toHex(secp.getPublicKey(privateKey1));

  const privateKey2 = toHex(secp.utils.randomPrivateKey());
  const publicKey2 = toHex(secp.getPublicKey(privateKey1));

  const privateKey3 = toHex(secp.utils.randomPrivateKey());
  const publicKey3 = toHex(secp.getPublicKey(privateKey1));

  return {
    pairKey1: { privateKey1, publicKey1 },
    pairKey2: { privateKey2, publicKey2 },
    pairKey3: { privateKey3, publicKey3 },
  };
};
