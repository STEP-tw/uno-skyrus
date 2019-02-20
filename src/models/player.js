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
  getPlayableCardsFor(otherCard) {
    return this.cards.filter(card => {
      return card.canPlayOnTopOf(otherCard);
    });
  }
}

module.exports = { Player };
