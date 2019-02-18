const { generateGameKey } = require('../utils/util.js');

const initializePile = function(Game, createDeck, shuffle, req, res) {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const colors = ['red', 'blue', 'green', 'yellow'];
  const deck = createDeck(numbers, colors);
  const game = new Game(deck);
  game.startGame(shuffle);
  const topDiscard = game.getTopDiscard();
  res.send(topDiscard);
};

const hostGame = function(req, res) {
  const gameKey = generateGameKey();
  res.cookie('gameKey', gameKey);
  res.redirect(302, '/lobby.html');
  res.end();
};

module.exports = { initializePile, hostGame };
