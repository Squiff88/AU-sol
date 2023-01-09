class TXO {
  constructor(owner, amount, spent = false) {
    this.spent = spent;
    this.owner = owner;
    this.amount = amount;
  }
  spend() {
    this.spent = true;
  }
}

module.exports = TXO;
