class Card {
  constructor() {}
}

class NumberedCard extends Card {
  constructor(number, color) {
    super();
    this.number = number;
    this.color = color;
  }

  canPlayOnTopOf(otherCard, runningColor) {
    return runningColor == this.color || otherCard.number == this.number;
  }

  action(currentPlayerIndex) {
    return ++currentPlayerIndex;
  }

  logMessage() {
    return this.number + ' ' + this.color;
  }
}

class WildCard extends Card {
  constructor() {
    super();
    this.isWildCard = true;
  }

  action(currentPlayerIndex) {
    return ++currentPlayerIndex;
  }

  canPlayOnTopOf() {
    return true;
  }

  logMessage() {
    return 'wildcard';
  }
}

module.exports = { NumberedCard, WildCard };
