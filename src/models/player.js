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

  removeCard(cardId) {
    this.cards.splice(cardId, 1);
  }
  getId() {
    return this.id;
  }
}

module.exports = { Player };
