class Player {
  constructor(name, id) {
    this.name = name;
    this.cards = [];
    this.id = id;
    this.playableCards = [];
    this.canDrawCard = true;
    this.unoCallStatus = false;
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
    this.cards = this.cards.concat(cards);
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

  calculatePlayableCards(otherCard, runningColor, hasDrawnTwo) {
    this.playableCards = this.cards.filter(card => {
      return card.canPlayOnTopOf(otherCard, runningColor, hasDrawnTwo);
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

  setUnoCall(hasCalledUno) {
    if (hasCalledUno && this.cards.length == 1) {
      this.unoCallStatus = true;
    }
  }

  getUnoCallStatus() {
    return this.unoCallStatus;
  }
}

module.exports = { Player };
