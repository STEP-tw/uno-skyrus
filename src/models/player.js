class Player {
  constructor(name) {
    this.name = name;
    this.cards = [];
  }
  getCards() {
    return this.cards;
  }

  addCards(cards) {
    this.cards = cards;

  }
}

module.exports = { Player };
