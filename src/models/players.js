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
  getPlayer(playerId) {
    return this.players.find(player => {
      return player.id == playerId;
    });
  }

  setFirstTurn() {
    this.currentPlayer = this.players[1];
  }
}

module.exports = { Players };
