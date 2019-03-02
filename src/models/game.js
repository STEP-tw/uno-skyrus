const getCardId = function(cardId) {
  return +cardId.match(/[0-9]+/)[0];
};

const canNotThrow = (isCurrentPlayer, isThrowable) =>
  !(isCurrentPlayer && isThrowable);

const canNotDraw = (isCurrentPlayer, drawCardStatus) =>
  !(isCurrentPlayer && drawCardStatus);

const increaseGain = cardsToDraw => {
  if (cardsToDraw === 1) {
    return cardsToDraw;
  }
  return 2;
};

class Game {
  constructor(
    deck,
    playersCount,
    gameKey,
    players,
    activityLog,
    saveStatus = { status: false }
  ) {
    this.players = players;
    this.activityLog = activityLog;
    this.deck = [...deck];
    this.stack = [];
    this.pile = [];
    this.playersCount = playersCount;
    this.gameKey = gameKey;
    this.saveStatus = saveStatus;
    this.status = false;
    this.runningColor = '';
    this.cardsToDraw = 1;
    this.hasDrawnTwo = true;
    this.hasDrawnFour = true;
  }

  updateSaveStatus() {
    this.saveStatus.status = true;
    this.saveStatus.lastSaved = new Date().toLocaleString();
  }

  getSaveStatus() {
    return this.saveStatus;
  }

  loadData(stack, pile, status, runningColor, cardsToDraw, hasDrawnTwo) {
    this.stack = stack;
    this.pile = pile;
    this.status = status;
    this.runningColor = runningColor;
    this.cardsToDraw = cardsToDraw;
    this.hasDrawnTwo = hasDrawnTwo;
  }

  getPlayers() {
    return this.players;
  }

  throwCard(playerId, id, unoCallStatus) {
    const player = this.players.getPlayer(playerId);
    const cardId = getCardId(id);
    const playerCards = player.getCards();
    const thrownCard = playerCards[cardId];
    this.runningColor = thrownCard.color;

    const playableCards = player.getPlayableCards();
    const normalPlayableCards = playableCards.filter(card => !card.isDrawFour);
    const hasNoNormalPlayableCards = normalPlayableCards.length === 0;

    const isThrowable = thrownCard.canPlayOnTopOf(
      this.getTopDiscard(),
      this.runningColor,
      this.hasDrawnTwo,
      this.hasDrawnFour,
      hasNoNormalPlayableCards
    );
    const name = player.getName();

    if (canNotThrow(this.isCurrentPlayer(playerId), isThrowable)) {
      return;
    }

    if (thrownCard.isDrawTwo) {
      const gain = increaseGain(this.cardsToDraw);
      this.hasDrawnTwo = false;
      this.cardsToDraw = this.cardsToDraw + gain;
    }

    if (thrownCard.isDrawFour) {
      this.hasDrawnFour = false;
      this.cardsToDraw = 4;
    }

    player.resetHasCaught();
    player.removeCard(cardId);
    this.pile.push(thrownCard);
    player.setUnoCall(unoCallStatus);
    this.log(name, ' has thrown ', thrownCard.logMessage());
    if (player.getUnoCallStatus()) {
      this.log(name, ' has called ', 'UNO');
    }

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
        this.hasDrawnTwo,
        this.hasDrawnFour
      );
    });
  }

  initializePile() {
    const topDiscard = this.stack.pop();

    if (topDiscard.isDrawTwo) {
      this.hasDrawnTwo = false;
      this.cardsToDraw = 2;
    }

    if (topDiscard.isReverseCard) {
      this.players.updateCurrentPlayer(topDiscard);
    }

    if (topDiscard.isSkipCard) {
      this.players.changeTurn();
    }

    this.pile.push(topDiscard);
  }

  startGame(shuffle) {
    this.stack = shuffle(this.deck);
    this.dealCards();
    this.initializePile();
    this.runningColor = this.getTopDiscard().getColor();
    this.status = true;
    this.players.setCurrentPlayer();
    this.updatePlayableCards();
  }

  drawCards(playerId) {
    const currentPlayer = this.players.getCurrentPlayer();
    const drawCardStatus = currentPlayer.getDrawCardStatus();
    console.log('drawCardStatus -------------', drawCardStatus);

    if (canNotDraw(this.isCurrentPlayer(playerId), drawCardStatus)) {
      return;
    }

    const playerName = currentPlayer.getName();
    const action = ' has drawn ';
    let subject = 'a card';
    const drawnCards = this.stack.splice(-this.cardsToDraw);
    currentPlayer.resetHasCaught();
    currentPlayer.resetUnoCall();
    currentPlayer.addCards(drawnCards);
    currentPlayer.setDrawCardStatus(false);

    currentPlayer.setPlayableCards([]);

    if (this.cardsToDraw != 1) {
      subject = this.cardsToDraw + ' cards';
      this.activityLog.addLog(playerName, action, subject);
      this.cardsToDraw = 1;
      this.hasDrawnTwo = true;
      this.hasDrawnFour = true;
      this.getPlayers().changeTurn();
      this.updatePlayableCards();
      return [];
    }
    console.log('drawnCards--------------', drawnCards);

    const playableCards = currentPlayer.getPlayableCards();
    console.log('playableCards-----------', playableCards);

    const normalPlayableCards = playableCards.filter(card => !card.isDrawFour);
    const hasNoNormalPlayableCards = normalPlayableCards.length === 0;

    const isPlayable = drawnCards[0].canPlayOnTopOf(
      this.getTopDiscard(),
      this.runningColor,
      this.hasDrawnTwo,
      this.hasDrawnFour,
      hasNoNormalPlayableCards
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

  catchPlayer(playerId) {
    const lastPlayer = this.players.getLastPlayer();
    const catchingPlayer = this.players.getPlayer(playerId).getName();

    if (
      !lastPlayer.getUnoCallStatus() &&
      lastPlayer.getCardsCount() == 1 &&
      !lastPlayer.hasCaught
    ) {
      if (this.stack.length < 2) {
        this.refillStack();
      }
      lastPlayer.setHasCaught();
      const penaltyCards = this.stack.splice(-2);
      lastPlayer.addCards(penaltyCards);
      this.log(catchingPlayer, ' has caught ', lastPlayer.getName());
    }
  }
}

module.exports = { Game };
