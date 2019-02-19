class Game {
  constructor(deck, playersCount, gameKey, players) {
    this.players = players;
    this.deck = [...deck];
    this.stack = [];
    this.pile = [];
    this.playersCount = playersCount;
    this.gameKey = gameKey;
  }

  getPlayers() {
    return this.players;
  }

  startGame(shuffle) {
    this.stack = shuffle(this.deck);
    this.dealCards();
    this.pile.push(this.stack.pop());
  }

  getPlayerCards(playerName) {
    const player = this.players.getPlayers().filter(player => {
      return player.name === playerName;
    });
    return player[0].cards;
  }

  dealCards() {
    this.players.getPlayers().forEach(player => {
      const hand = this.stack.splice(0, 7);
      player.addCards(hand);
    });
  }

  getTopDiscard() {
    return this.pile[this.pile.length - 1];
  }

  getPlayersCount() {
    return this.playersCount;
  }

  getKey() {
    return this.gameKey;
  }
}

module.exports = { Game };
