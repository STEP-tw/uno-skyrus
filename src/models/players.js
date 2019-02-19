class Players {
  constructor(hostPlayer) {
    this.host = hostPlayer;
    this.players = [hostPlayer];
    this.currentPlayer = hostPlayer;
  }
  getCurrentPlayer() {
    return this.currentPlayer;
  }
  getNumberOfPlayers() {
    return this.players.length;
  }
  addPlayer(player) {
    this.players.push(player);
  }
  getPlayers() {
    return this.players;
  }
}

module.exports = { Players };
