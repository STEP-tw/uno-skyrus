class ActivityLog {
  constructor(logs = []) {
    this.logs = logs;
  }

  getLatestLog() {
    return this.logs[this.logs.length - 1];
  }

  logJoinGame(playerName) {
    const log = {
      action: 'join-game',
      playerName
    };
    this.logs.push(log);
  }

  logLeaveGame(playerName) {
    const log = {
      action: 'leave-game',
      playerName
    };
    this.logs.push(log);
  }

  logThrowCard(playerName, card) {
    const log = {
      action: 'throw-card',
      playerName,
      card
    };
    this.logs.push(log);
  }

  logDrawCards(playerName, cardCount) {
    const log = {
      action: 'draw-card',
      playerName,
      cardCount
    };
    this.logs.push(log);
  }

  logCallUno(playerName) {
    const log = {
      action: 'call-uno',
      playerName
    };

    this.logs.push(log);
  }

  logCaught(catcher, victim) {
    const log = {
      action: 'caught',
      victim,
      catcher
    };

    this.logs.push(log);
  }

  logWrongCatch(playerName) {
    const log = {
      action: 'wrong-catch',
      playerName
    };
    this.logs.push(log);
  }

  logRefillStack() {
    this.logs.push({ action: 'refill-stack' });
  }
}

module.exports = { ActivityLog };
