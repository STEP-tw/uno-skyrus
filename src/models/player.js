class Player {
  constructor(name, id) {
    this.name = name;
    this.cards = [];
    this.id = id;
  }
  getCards() {
    return this.cards;
  }

  addCards(cards) {
    this.cards = cards;
  }
}

module.exports = { Player };
