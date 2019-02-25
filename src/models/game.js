class Game {
  constructor(deck, playersCount, gameKey, players, activityLog) {
    this.players = players;
    this.activityLog = activityLog;
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

  throwCard(playerId, cardId) {
    const currentPlayer = this.players.getCurrentPlayer();
    const player = this.players.getPlayer(playerId);
    const playerCards = player.getCards();
    const thrownCard = playerCards[cardId];
    const isPlayable = thrownCard.canPlayOnTopOf(this.getTopDiscard());
    const name = player.getName();
    const throwStatus = {
      name: currentPlayer.getName(),
      hasWon: true
    };

    if (+playerId == currentPlayer.getId() && isPlayable) {
      player.removeCard(cardId);
      this.pile.push(thrownCard);
      this.log(
        name,
        ' has thrown ',
        thrownCard.number + ' ' + thrownCard.color
      );
      if (!this.hasWon(currentPlayer)) {
        this.updatePlayer(thrownCard);
        throwStatus.hasWon = false;
      }
      return throwStatus;
    }
  }

  log(subject, action, object) {
    this.activityLog.addLog(subject, action, object);
  }

  updatePlayer(thrownCard) {
    this.players.updateCurrentPlayer(thrownCard);
    this.updatePlayableCards();
  }

  hasWon(player) {
    if (!player.getCards().length) {
      this.activityLog.addLog(player.getName(), ' has won ', 'the game');
      return true;
    }
    return false;
  }

  updatePlayableCards() {
    this.players
      .getPlayers()
      .forEach(player => player.calculatePlayableCards(this.getTopDiscard()));
  }

  startGame(shuffle) {
    this.stack = shuffle(this.deck);
    this.dealCards();
    this.pile.push(this.stack.pop());
    this.status = true;
    this.players.setCurrentPlayer();
    this.updatePlayableCards();
  }

  drawCard(playerId) {
    const currentPlayer = this.players.getCurrentPlayer();
    if (currentPlayer.id == playerId && currentPlayer.getDrawCardStatus()) {
      const drawnCard = this.stack.pop();
      currentPlayer.addCard(drawnCard);
      currentPlayer.setDrawCardStatus(false);
      this.activityLog.addLog(currentPlayer.getName(), ' has drawn ', 'a card');
      currentPlayer.setPlayableCards([]);
      if (drawnCard.canPlayOnTopOf(this.getTopDiscard())) {
        currentPlayer.setPlayableCards([drawnCard]);
      } else {
        this.getPlayers().changeTurn();
      }
    }
  }

  getPlayerCards(playerId) {
    const player = this.players.getPlayers().find(player => {
      return player.id == playerId;
    });
    return player.cards;
  }

  dealCards() {
    this.players.getPlayers().forEach(player => {
      const hand = this.stack.splice(this.stack.length - 7);
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

  getStack() {
    return this.stack;
  }

  refillStack() {
    this.stack = this.pile.slice(0, -1);
    this.pile = this.pile.slice(-1);
    this.activityLog.addLog('stack', ' has been refilled', '');
  }

  hasStarted() {
    return this.status;
  }
}

module.exports = { Game };
