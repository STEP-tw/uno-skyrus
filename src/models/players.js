class Players {
  constructor(hostPlayer) {
    this.host = hostPlayer;
    this.players = [hostPlayer];
    this.currentPlayer = hostPlayer;
    this.currentPlayerIndex = 1;
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
  setCurrentPlayer() {
    this.currentPlayer = this.players[this.currentPlayerIndex];
  }
  updateCurrentPlayer(thrownCard) {
    const updatedIndex = thrownCard.action(this.currentPlayerIndex);
    this.currentPlayerIndex = updatedIndex % this.getNumberOfPlayers();
    this.setCurrentPlayer();
  }
}

module.exports = { Players };
