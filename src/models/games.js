class Games {
  constructor() {
    this.games = [];
  }

  addGame(game) {
    this.games.push(game);
  }

  doesGameExist(gameKey) {
    return this.games.some(game => game.getKey() == gameKey);
  }

  getGame(gameKey) {
    return this.games.find(game => game.getKey() == gameKey);
  }
  saveGame(writeData, gameKey) {
    writeData(gameKey, this.getGame(gameKey));
  }
}

module.exports = { Games };
