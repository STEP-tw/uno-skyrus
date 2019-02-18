class Game {
  constructor(deck) {
    this.deck = deck;
    this.pile = [];
    this.stack = null;
  }

  startGame(shuffle) {
    this.stack = shuffle(this.deck);
    this.pile.push(this.stack.pop());
  }

  getTopDiscard() {
    return this.pile[this.pile.length - 1];
  }
}

module.exports = Game;
