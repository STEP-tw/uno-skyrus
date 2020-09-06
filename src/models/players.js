class Players {
  constructor(
    hostPlayer,
    currentPlayer = {},
    currentPlayerIndex = 1,
    turnDirection = 1
  ) {
    this.host = hostPlayer;
    this.players = [hostPlayer];
    this.lastPlayer = hostPlayer;
    this.currentPlayer = currentPlayer;
    this.currentPlayerIndex = currentPlayerIndex;
    this.turnDirection = turnDirection;
  }
  loadData(lastPlayer) {
    this.lastPlayer = lastPlayer;
  }
  loadLastPlayer(lastPlayer) {
    this.lastPlayer = lastPlayer;
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

  getPlayersCount() {
    return this.players.length;
  }

  getPlayer(playerId) {
    return this.players.find(player => {
      return player.id == playerId;
    });
  }

  isCurrent(player) {
    return this.currentPlayer.id == player.id;
  }

  setCurrentPlayer() {
    if (this.currentPlayerIndex < 0) {
      this.currentPlayerIndex += this.getNumberOfPlayers();
    }
    this.lastPlayer = this.currentPlayer;
    this.currentPlayer = this.players[this.currentPlayerIndex];
  }

  changeTurn() {
    this.currentPlayerIndex += this.turnDirection;
    this.currentPlayerIndex =
      this.currentPlayerIndex % this.getNumberOfPlayers();
    this.setCurrentPlayer();
    this.currentPlayer.setDrawCardStatus(true);
  }

  updateCurrentPlayer(thrownCard) {
    const { updatedIndex, turnDirection } = thrownCard.action(
      this.turnDirection,
      this.currentPlayerIndex
    );
    if (turnDirection) {
      this.turnDirection = turnDirection;
    }

    this.currentPlayerIndex = updatedIndex % this.getNumberOfPlayers();
    this.setCurrentPlayer();
    this.currentPlayer.setDrawCardStatus(true);
  }

  getLastPlayer() {
    return this.lastPlayer;
  }
  setPlayers(players) {
    this.players = players;
  }

  removePlayer(playerId) {
    this.players = this.players.filter(player => {
      return player.getId() != playerId;
    });
  }

  resetLastPlayerUnoCall(){
    this.lastPlayer.resetUnoCall();
  }
}

module.exports = { Players };
