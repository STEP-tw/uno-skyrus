const { generateGameKey } = require('../utils/util.js');
const { Player } = require('../models/player');
const Game = require('../models/game');
const { createDeck } = require('../models/deck');
const ld = require('lodash');

const initializePile = function(req, res) {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const colors = ['red', 'blue', 'green', 'yellow'];
  const deck = createDeck(numbers, colors);
  const game = new Game(deck);
  game.startGame(ld.shuffle);
  const topDiscard = game.getTopDiscard();
  res.send(topDiscard);
};

const hostGame = function(req, res) {
  const gameKey = generateGameKey();
  res.cookie('gameKey', gameKey);
  res.redirect(302, '/lobby.html');
  res.end();
};

const servePlayerCards = function(req, res) {
  const player = new Player('Reshmi');
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const colors = ['red', 'green', 'blue', 'yellow'];
  const deck = createDeck(numbers, colors);
  const game = new Game(deck);
  game.addPlayer(player);
  game.startGame(ld.shuffle);
  const cards = game.getPlayerCards('Reshmi');
  res.send(cards);
};

module.exports = { initializePile, servePlayerCards, hostGame };
