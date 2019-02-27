class Card {}

class NumberedCard extends Card {
  constructor(number, color) {
    super();
    this.number = number;
    this.color = color;
  }

  canPlayOnTopOf(otherCard, runningColor, hasDrawnTwo) {
    return (
      hasDrawnTwo &&
      (runningColor == this.color || otherCard.number == this.number)
    );
  }

  action(currentPlayerIndex) {
    ++currentPlayerIndex;
    return { updatedIndex: currentPlayerIndex };
  }

  getColor() {
    return this.color;
  }

  logMessage() {
    return this.number + ' ' + this.color;
  }
}

class WildCard extends Card {
  constructor() {
    super();
    this.isWildCard = true;
    this.isColorDeclared = false;
  }

  action(currentPlayerIndex) {
    this.isColorDeclared = false;
    return { updatedIndex: currentPlayerIndex };
  }

  canPlayOnTopOf(topDiscard, runningColor, hasDrawnTwo) {
    return hasDrawnTwo;
  }

  logMessage() {
    return 'wildcard';
  }

  setColorAsDeclared() {
    this.isColorDeclared = true;
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
    ++currentPlayerIndex;
    return { updatedIndex: currentPlayerIndex };
  }

  canPlayOnTopOf(otherCard, runningColor) {
    return runningColor == this.color || otherCard.symbol == this.symbol;
  }

  getColor() {
    return this.color;
  }

  logMessage() {
    return this.symbol + ' ' + this.color;
  }
}

class SkipCard extends Card {
  constructor(symbol, color) {
    super();
    this.color = color;
    this.isSkipCard = true;
    this.symbol = symbol;
  }

  action(currentPlayerIndex) {
    currentPlayerIndex += 2;
    return { updatedIndex: currentPlayerIndex };
  }

  canPlayOnTopOf(topDiscard, runningColor, hasDrawnTwo) {
    return hasDrawnTwo && (runningColor == this.color || topDiscard.isSkipCard);
  }

  logMessage() {
    return `Skip ${this.color}`;
  }

  getColor() {
    return this.color;
  }
}

class ReverseCard extends Card {
  constructor(symbol, color) {
    super();
    this.symbol = symbol;
    this.color = color;
    this.isReverseCard = true;
  }

  getColor() {
    return this.color;
  }

  action(currentPlayerIndex, players) {
    players = players.reverse();
    const updatedIndex = 1 + currentPlayerIndex;
    return { players, updatedIndex };
  }

  logMessage() {
    return `Reverse ${this.color}`;
  }

  canPlayOnTopOf(topDiscard, runningColor, hasDrawnTwo) {
    const status =
      hasDrawnTwo && (runningColor == this.color || topDiscard.isReverseCard);
    return status;
  }
}

module.exports = { NumberedCard, WildCard, SkipCard, DrawTwo, ReverseCard };
