class Game {
  constructor(deck, playersCount, gameKey, players) {
    this.players = players;
    this.deck = [...deck];
    this.stack = [];
    this.pile = [];
    this.playersCount = playersCount;
    this.gameKey = gameKey;
    this.status = false;
  }

  getPlayers() {
    return this.players;
  }

  startGame(shuffle) {
    this.stack = shuffle(this.deck);
    this.dealCards();
    this.pile.push(this.stack.pop());
    this.status = true;
  }

  getPlayerCards(playerId) {
    const player = this.players.getPlayers().find(player => {
      return player.id == playerId;
    });
    return player.cards;
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

  hasStarted() {
    return this.status;
  }
}

module.exports = { Game };