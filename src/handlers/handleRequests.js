const fs = require('fs');

const { generateGameKey } = require('../utils/util.js');
const { Player } = require('../models/player');
const { Game } = require('../models/game');
const { createDeck } = require('../models/deck');
const ld = require('lodash');

const LOBBY = fs.readFileSync('./public/lobby.html', 'utf8');

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
  const { hostName } = req.body;
  const game = new Game([], 1, gameKey);
  const player = new Player(hostName);
  game.addPlayer(player);
  req.app.games.addGame(game, gameKey);
  res.cookie('gameKey', gameKey);
  res.redirect(302, '/lobby.html');
  res.end();
};

const joinGame = function(req, res) {
  const { playerName, gameKey } = req.body;
  const games = req.app.games;
  if (!games.doesGameExist(gameKey)) {
    res.send('Invalid game key....');
    return;
  }
  const game = games.getGame(gameKey);
  const player = new Player(playerName);
  game.addPlayer(player);
  res.cookie('gameKey', gameKey);
  res.redirect('/lobby.html');
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

const haveAllPlayersJoined = function(game) {
  const joinedPlayers = game.getPlayers().length;
  const totalPlayers = game.getTotalPlayers();

  return joinedPlayers == totalPlayers;
};

const handleGame = function(req, res) {
  const { gameKey } = req.cookies;
  const game = req.app.games.getGame(gameKey);
  if (haveAllPlayersJoined(game)) {
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
  joinGame,
  serveLobby,
  servePlayerCards,
  handleGame
};
