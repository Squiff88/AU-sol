import { useEffect, useState } from "react";
import server from "./server";

const styles = { textDecoration: "underline", cursor: "pointer" };

function Wallet({ address, setAddress, balance, setBalance }) {
  const [generatedWallets, setGeneratedWallets] = useState({
    wallet1: "",
    wallet2: "",
    wallet3: "",
  });

  useEffect(() => {
    const init = async () => {
      const response = await server.get("wallets");
      if (generatedWallets.wallet1 === "") {
        const wallet = {};
        Object.entries(response.data).map((entry, idx) => {
          if (entry[1].wallet) {
            wallet[`wallet${idx + 1}`] = entry[1].wallet;
          }
        });
        setGeneratedWallets(wallet);
      }
    };
    init();
  }, []);

  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      {Array.from(Array(3)).map((_, i) => {
        return (
          <p key={i}>
            Wallet {i + 1} -{" "}
            <span
              style={styles}
              onClick={() =>
                onChange({
                  target: { value: generatedWallets[`wallet${i + 1}`] },
                })
              }
            >
              0x{i + 1}
            </span>
          </p>
        );
      })}

      <label>
        Wallet Address
        <input
          placeholder="Type an address, for example: 0x1"
          value={address}
          onChange={onChange}
        ></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
