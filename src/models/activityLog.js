class ActivityLog {
  constructor(logs = []) {
    this.logs = logs;
  }
  addLog(subject, action, object) {
    this.logs.push(subject + action + object);
  }
  getLatestLog() {
    return this.logs[this.logs.length - 1];
  }
}

module.exports = { ActivityLog };
