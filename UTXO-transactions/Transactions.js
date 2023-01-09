class Transaction {
  constructor(inputUTXOs, outputUTXOs) {
    this.inputUTXOs = inputUTXOs;
    this.outputUTXOs = outputUTXOs;
    this.fee = 0;
  }
  execute() {
    let inputAmount = 0;
    let outputAmount = 0;
    for (let i = 0; i < this.inputUTXOs.length; i++) {
      if (this.inputUTXOs[i].spent) {
        throw Error("Spent UTXo");
      }

      inputAmount += this.inputUTXOs[i].amount;
    }

    for (let i = 0; i < this.outputUTXOs.length; i++) {
      outputAmount += this.outputUTXOs[i].amount;
    }

    if (inputAmount < outputAmount) {
      throw Error("Insufficient funds");
    }

    // If all went well mark input UTXOs as spent
    for (let i = 0; i < this.inputUTXOs.length; i++) {
      this.inputUTXOs[i].spent = true;
    }

    this.fee = inputAmount - outputAmount;
  }
}

module.exports = Transaction;
