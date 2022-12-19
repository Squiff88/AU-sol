import { useState } from "react";
import server from "./server";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import * as secp from "ethereum-cryptography/secp256k1";

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [nonce, setNonce] = useState(0);
  const [transactionHistory, setTransationHistory] = useState([
    {
      timestamp: 0,
      sender: "",
      recipient: "",
      amount: 0,
      txnID: 0,
    },
  ]);

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    const privKey = await prompt("Enter your private key");
    // Hash the information about the transaction
    const messageHash = keccak256(
      utf8ToBytes(recipient + sendAmount + JSON.stringify(nonce))
    );

    if (privKey) {
      // Sign the transaction
      const signTxn = await secp.sign(messageHash, privKey, {
        recovered: true,
      });

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

        const transactionData = {
          amount: parseInt(sendAmount),
          sender: address,
          recipient,
          timestamp: Date.now(),
        };

        const nextTxnID =
          transactionHistory[transactionHistory.length - 1].txnID + 1;
        const transactions =
          transactionHistory[transactionHistory.length - 1].txnID === 0
            ? [transactionData]
            : [
                ...transactionHistory,
                {
                  amount: parseInt(sendAmount),
                  sender: address,
                  recipient,
                  timestamp: Date.now(),
                  txnID: nextTxnID,
                },
              ];

        setTransationHistory(transactions);
        setBalance(balance);
        setNonce((prevNonce) => prevNonce + 1);
        setRecipient("");
        setSendAmount("");
      } catch (ex) {
        alert(ex.response.data.message);
      }
    }
  }

  return (
    <>
      <div style={{ height: "100%", flexGrow: 1 }}>
        <form className="container transfer" onSubmit={transfer}>
          <h1>Send Transaction</h1>
          Sender address : <b>{address}</b>
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
      </div>
      <div className="transaction-history">
        <article>
          <h1 style={{ padding: "20px" }}>Transaction History: </h1>

          <div>
            {transactionHistory.map((txn) => {
              return (
                <div className="transaction-container" key={txn.timestamp}>
                  <p>
                    Sender: <br />
                    {txn.sender}
                  </p>
                  <p>
                    Recipient: <br />
                    {txn.recipient}
                  </p>
                  <p>Amount: {txn.amount}</p>
                  <p>Time: {new Date(txn.timestamp).toDateString()}</p>
                </div>
              );
            })}
          </div>
        </article>
      </div>
    </>
  );
}

export default Transfer;
