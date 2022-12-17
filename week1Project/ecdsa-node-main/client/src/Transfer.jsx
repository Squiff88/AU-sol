import { useState } from "react";
import server from "./server";
import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";
import * as secp from "ethereum-cryptography/secp256k1";

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [nonce, setNonce] = useState(0);

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    const privKey = await prompt("Enter your private key");

    const messageHash = keccak256(
      utf8ToBytes(recipient + sendAmount + JSON.stringify(nonce))
    );

    console.log(privKey, "priv key here ...");
    if (privKey) {
      const signTxn = await secp.sign(messageHash, privKey, {
        recovered: true,
      });

      console.log(signTxn, "signTxn ....");

      try {
        const {
          data: { balance },
        } = await server.post(`send`, {
          sender: address,
          amount: parseInt(sendAmount),
          recipient,
          nonce,
          signTxn,
        });
        setBalance(balance);
        setNonce((prevNonce) => prevNonce + 1);
      } catch (ex) {
        alert(ex.response.data.message);
      }
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>
      {address}
      address
      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>
      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>
      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
