class Player {
  constructor(name, id) {
    this.name = name;
    this.cards = [];
    this.id = id;
    this.playableCards = [];
    this.canDrawCard = true;
  }
  getCards() {
    return this.cards;
  }

  setDrawCardStatus(status) {
    this.canDrawCard = status;
  }

  getDrawCardStatus() {
    return this.canDrawCard;
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

  calculatePlayableCards(otherCard, runningColor) {
    this.playableCards = this.cards.filter(card => {
      return card.canPlayOnTopOf(otherCard, runningColor);
    });
  }

  hasWon() {
    if (!this.cards.length) {
      return true;
    }
    return false;
  }

  setPlayableCards(cards) {
    this.playableCards = cards;
  }

  getPlayableCards() {
    return this.playableCards;
  }
}

module.exports = { Player };
