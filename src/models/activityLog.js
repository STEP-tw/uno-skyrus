class ActivityLog {
  constructor(gameId, hostName) {
    this.logs = [`${hostName} started game with id ${gameId}`];
  }
  addLog(subject, action, object) {
    this.logs.push(subject + action + object);
  }
  getLatestLog() {
    return this.logs[this.logs.length - 1];
  }
}

module.exports = { ActivityLog };