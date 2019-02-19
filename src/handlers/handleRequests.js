const fs = require('fs');

const { generateGameKey } = require('../utils/util.js');
const { Player } = require('../models/player');
const { Game } = require('../models/game');
const { createDeck } = require('../models/deck');
const { Players } = require('../models/players.js');
const ld = require('lodash');

const LOBBY = fs.readFileSync('./public/lobby.html', 'utf8');

const initializePile = function(req, res) {
  const { gameKey } = req.cookies;
  const game = req.app.games.getGame(gameKey);
  const topDiscard = game.getTopDiscard();
  res.send(topDiscard);
};

const hostGame = function(req, res) {
  const gameKey = generateGameKey();
  const { hostName } = req.body;
  const host = new Player(hostName);
  const players = new Players(host);
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const colors = ['red', 'blue', 'green', 'yellow'];
  const deck = createDeck(numbers, colors);
  const game = new Game(deck, 1, gameKey, players);

  req.app.games.addGame(game, gameKey);

  res.cookie('gameKey', gameKey);
  res.redirect(302, '/lobby.html');
  res.end();
};

const servePlayerCards = function(req, res) {
  const { gameKey } = req.cookies;
  const game = req.app.games.getGame(gameKey);
  const cards = game.getPlayerCards(game.getPlayers().getPlayers()[0].name);
  res.send(cards);
};

const haveAllPlayersJoined = function(game) {
  const joinedPlayers = game.getPlayers().getNumberOfPlayers();
  const playersCount = game.getPlayersCount();

  return joinedPlayers == playersCount;
};

const handleGame = function(req, res) {
  const { gameKey } = req.cookies;
  const game = req.app.games.getGame(gameKey);

  if (haveAllPlayersJoined(game)) {
    game.startGame(ld.shuffle);
    res.redirect('/game.html');
    res.end();
    return;
  }
  res.end();
};

const serveLobby = function(req, res) {
  const { gameKey } = req.cookies;
  const modifiedLobby = LOBBY.replace('__gameKey__', gameKey);
  res.send(modifiedLobby);
  res.end();
};

module.exports = {
  initializePile,
  hostGame,
  serveLobby,
  servePlayerCards,
  handleGame
};
