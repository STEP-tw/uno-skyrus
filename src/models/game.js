class Game {
  constructor(deck = []) {
    this.players = [];
    this.deck = deck;
    this.stack = [];
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

  dealCards(shuffler) {
    this.deck = shuffler(this.deck);
    this.stack = this.deck.slice();
    this.players.forEach(player => {
      const hand = this.stack.splice(0, 7);
      player.addCards(hand);
    });
  }
}

module.exports = { Game };
