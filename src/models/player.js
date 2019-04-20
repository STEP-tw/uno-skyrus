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

		//SCORE ATTRIBUTES
		this.thrownCards = 0;
		this.maxCard = 0;
		this.score = 0;
  }

	//STATISTICS FUNCTIONS -----------
	calculateScore(){
		var score = 0;
		for(var i =0; i<this.cards.length;i++) {
      if(this.cards[i].isReverseCard || this.cards[i].isSkipCard || this.cards[i].isDrawTwo){
        score+=20;
      } else
      if(this.cards[i].isWildCard && !this.cards[i].isDrawFour) {
        score +=50;
      } else
      if(this.cards[i].isDrawFour) {
        score +=70;
      } else
      switch (this.cards[i].symbol) {
        case 1:
          score+=1;
          break;
        case 2:
          score+=2;
          break;
        case 3:
          score+=3;
          break;
        case 4:
          score+=4;
          break;
        case 5:
          score+=5;
          break;
        case 6:
          score+=6;
          break;
        case 7:
          score+=7;
          break;
        case 8:
          score+=8;
          break;
        case 9:
          score+=9;
          break;
      }
    }
		this.score = score;
		return this.score;
	}

  getMaxCard(actual) {
    if(actual>this.maxCard) {
       this.maxCard = actual;
    }
    return this.maxCard;
  }

	increaseThrownCard(){
		this.thrownCards++;
	}

  getThrownCards() {
    return this.thrownCards;
  }
	// --------------------------


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
