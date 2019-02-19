class Game {
  constructor(deck = [], totalPlayers, gameKey) {
    this.players = [];
    this.deck = [...deck];
    this.stack = [];
    this.pile = [];
    this.totalPlayers = totalPlayers;
    this.gameKey = gameKey;
  }

  addPlayer(player) {
    this.players.push(player);
  }

  getPlayers() {
    return this.players;
  }

  getPlayerCards(playerName) {
    const player = this.players.filter(player => {
      return player.name === playerName;
    });
    return player[0].cards;
  }

  dealCards() {
    this.players.forEach(player => {
      const hand = this.stack.splice(0, 7);
      player.addCards(hand);
    });
  }
  startGame(shuffle) {
    this.stack = shuffle(this.deck);
    this.dealCards();
    this.pile.push(this.stack.pop());
  }

  getTopDiscard() {
    return this.pile[this.pile.length - 1];
  }
  getTotalPlayers() {
    return this.totalPlayers;
  }
  getKey() {
    return this.gameKey;
  }
}

module.exports = { Game };
