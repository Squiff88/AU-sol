import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

export const generateThreePKs = () => {
  const privateKey1 = toHex(secp.utils.randomPrivateKey());
  const privateKey2 = toHex(secp.utils.randomPrivateKey());
  const privateKey3 = toHex(secp.utils.randomPrivateKey());

  return { privateKey1, privateKey2, privateKey3 };
};
