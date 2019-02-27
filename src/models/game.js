const getCardId = function(cardId) {
  return +cardId.match(/[0-9]+/)[0];
};

const canNotThrow = (playerId, id, isThrowable) =>
  !(+playerId == id && isThrowable);

const canNotDraw = (playerId, id, drawCardStatus) =>
  !(+playerId == id && drawCardStatus);

const increaseGain = cardsToDraw => {
  if (cardsToDraw === 1) {
    return cardsToDraw;
  }
  return 2;
};

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
    this.runningColor = '';
    this.cardsToDraw = 1;
    this.hasDrawnTwo = true;
  }

  getPlayers() {
    return this.players;
  }

  throwCard(playerId, id) {
    const currentPlayer = this.players.getCurrentPlayer();
    const player = this.players.getPlayer(playerId);
    const cardId = getCardId(id);
    const playerCards = player.getCards();
    const thrownCard = playerCards[cardId];
    this.runningColor = thrownCard.color;
    const isThrowable = thrownCard.canPlayOnTopOf(
      this.getTopDiscard(),
      this.runningColor,
      this.hasDrawnTwo
    );
    const name = player.getName();

    if (canNotThrow(playerId, currentPlayer.getId(), isThrowable)) {
      return;
    }

    if (thrownCard.isDrawTwo) {
      const gain = increaseGain(this.cardsToDraw);
      this.hasDrawnTwo = false;
      this.cardsToDraw = this.cardsToDraw + gain;
    }

    player.removeCard(cardId);
    this.pile.push(thrownCard);
    this.log(name, ' has thrown ', thrownCard.logMessage());
    this.updatePlayer(thrownCard);
  }

  log(subject, action, object) {
    this.activityLog.addLog(subject, action, object);
  }

  updatePlayer(thrownCard) {
    this.players.updateCurrentPlayer(thrownCard);
    this.updatePlayableCards();
  }

  updatePlayableCards() {
    this.players.getPlayers().forEach(player => {
      player.calculatePlayableCards(
        this.getTopDiscard(),
        this.getRunningColor(),
        this.hasDrawnTwo
      );
    });
  }

  startGame(shuffle) {
    this.stack = shuffle(this.deck);
    this.dealCards();
    this.pile.push(this.stack.pop());
    this.runningColor = this.getTopDiscard().getColor();
    this.status = true;
    this.players.setCurrentPlayer();
    this.updatePlayableCards();
  }

  drawCards(playerId) {
    const currentPlayer = this.players.getCurrentPlayer();
    const currentPlayerId = currentPlayer.getId();
    const drawCardStatus = currentPlayer.getDrawCardStatus();

    if (canNotDraw(playerId, currentPlayerId, drawCardStatus)) {
      return;
    }

    const playerName = currentPlayer.getName();
    const action = ' has drawn ';
    let subject = 'a card';
    const drawnCards = this.stack.splice(-this.cardsToDraw);
    currentPlayer.addCards(drawnCards);
    currentPlayer.setDrawCardStatus(false);

    currentPlayer.setPlayableCards([]);

    if (this.cardsToDraw != 1) {
      subject = this.cardsToDraw + ' cards';
      this.activityLog.addLog(playerName, action, subject);
      this.cardsToDraw = 1;
      this.hasDrawnTwo = true;
      this.getPlayers().changeTurn();
      this.updatePlayableCards();
      return [];
    }
    const isPlayable = drawnCards[0].canPlayOnTopOf(
      this.getTopDiscard(),
      this.runningColor,
      this.hasDrawnTwo
    );

    this.activityLog.addLog(playerName, action, subject);
    if (isPlayable) {
      currentPlayer.setPlayableCards(drawnCards);
      return drawnCards;
    }

    this.getPlayers().changeTurn();
    this.updatePlayableCards();
    return [];
  }

  haveToDrawMultiple() {
    return this.cardsToDraw > 1;
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

  victoryStatus() {
    const winner = this.players.getPlayers().find(player => player.hasWon());
    if (winner) {
      this.activityLog.addLog(winner.getName(), ' has won ', 'the game');
      return { name: winner.getName(), hasWon: true };
    }
    return { hasWon: false };
  }

  getRunningColor() {
    return this.runningColor;
  }

  refillStack() {
    this.stack = this.pile.slice(0, -1);
    this.pile = this.pile.slice(-1);
    this.activityLog.addLog('stack', ' has been refilled', '');
  }

  hasStarted() {
    return this.status;
  }

  isCurrentPlayer(playerId) {
    return this.players.getCurrentPlayer().getId() == playerId;
  }

  updateRunningColor(playerId, color) {
    const topDiscard = this.getTopDiscard();
    const validateCredentials = function() {
      return topDiscard.isWildCard && !topDiscard.isColorDeclared;
    };
    if (this.isCurrentPlayer(playerId) && validateCredentials()) {
      this.runningColor = color;
      this.players.changeTurn();
      topDiscard.setColorAsDeclared();
    }
    this.updatePlayableCards();
  }
}

module.exports = { Game };
