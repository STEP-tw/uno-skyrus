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

  addCard(card) {
    this.cards.push(card);
  }
  getCardsCount() {
    return this.cards.length;
  }
  removeCard(cardId) {
    this.cards.splice(cardId, 1);
  }
  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getPlayableCardsFor(otherCard) {
    return this.cards.filter(card => {
      return card.canPlayOnTopOf(otherCard);
    });
  }
}

module.exports = { Player };
