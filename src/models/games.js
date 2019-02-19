class Games {
  constructor() {
    this.games = [];
  }

  addGame(game) {
    this.games.push(game);
  }

  getGame(gameKey) {
    return this.games.find(game => game.getKey() == gameKey);
  }
}
module.exports = { Games };
