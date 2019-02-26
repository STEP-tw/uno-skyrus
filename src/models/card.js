class Card {}

class NumberedCard extends Card {
  constructor(number, color) {
    super();
    this.number = number;
    this.color = color;
  }

  canPlayOnTopOf(otherCard, runningColor) {
    if (!otherCard.symbol) {
      return otherCard.number == this.number || runningColor == this.color;
    }
    return false;
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

class DrawTwo extends Card {
  constructor(color) {
    super();
    this.symbol = '+2';
    this.color = color;
    this.isDrawTwo = true;
  }

  action(currentPlayerIndex) {
    return ++currentPlayerIndex;
  }

  canPlayOnTopOf(otherCard, runningColor) {
    return runningColor == this.color || otherCard.symbol === this.symbol;
  }

  logMessage() {
    return this.symbol + ' ' + this.color;
  }
}

class SkipCard extends Card {
  constructor(color) {
    super();
    this.color = color;
    this.symbol = 'skip';
  }

  action(currentPlayerIndex) {
    return currentPlayerIndex + 2;
  }

  canPlayOnTopOf(topDiscard, runningColor) {
    return runningColor == this.color || topDiscard.symbol == this.symbol;
  }

  logMessage() {
    return `${this.symbol} ${this.color}`;
  }
}

module.exports = { NumberedCard, WildCard, SkipCard, DrawTwo };
