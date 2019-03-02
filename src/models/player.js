class Player {
  constructor(
    name,
    id,
    cards = [],
    playableCards = [],
    canDrawCard = true,
    unoCallStatus = false,
    hasCaught = false
  ) {
    this.name = name;
    this.cards = cards;
    this.id = id;
    this.hasCaught = hasCaught;
    this.playableCards = playableCards;
    this.canDrawCard = canDrawCard;
    this.unoCallStatus = unoCallStatus;
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

  calculatePlayableCards(otherCard, runningColor, hasDrawnTwo, hasDrawnFour) {
    this.playableCards = this.cards.filter(card => {
      return card.canPlayOnTopOf(
        otherCard,
        runningColor,
        hasDrawnTwo,
        hasDrawnFour,
        false
      );
    });

    const hasNoPlayableCard = this.playableCards.length === 0;

    this.playableCards = this.cards.filter(card => {
      return card.canPlayOnTopOf(
        otherCard,
        runningColor,
        hasDrawnTwo,
        hasDrawnFour,
        hasNoPlayableCard
      );
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
  resetUnoCall() {
    this.unoCallStatus = false;
  }

  setHasCaught() {
    this.hasCaught = true;
  }

  resetHasCaught() {
    this.hasCaught = false;
  }

  getUnoCallStatus() {
    return this.unoCallStatus;
  }
}

module.exports = { Player };
