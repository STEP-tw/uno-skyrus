const fs = require('fs');

const { generateGameKey } = require('../utils/util.js');
const { Player } = require('../models/player');
const { Game } = require('../models/game');
const { createDeck } = require('../models/deck');
const { Players } = require('../models/players.js');
const ld = require('lodash');

const LOBBY = fs.readFileSync('./public/lobby.html', 'utf8');

const getTopDiscard = function(req, res) {
  const { gameKey } = req.cookies;
  const game = req.app.games.getGame(gameKey);
  const topDiscard = game.getTopDiscard();
  res.send(topDiscard);
};

const hostGame = function(req, res) {
  const gameKey = generateGameKey();
  const { hostName, totalPlayers } = req.body;
  const id = generateGameKey();
  const host = new Player(hostName, id);
  const players = new Players(host);
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const colors = ['red', 'blue', 'green', 'yellow'];
  const deck = createDeck(numbers, colors);
  const game = new Game(deck, totalPlayers, gameKey, players);

  req.app.games.addGame(game, gameKey);

  res.cookie('gameKey', gameKey);
  res.cookie('id', id);
  res.redirect(302, '/lobby.html');
  res.end();
};

const validateGameKey = function(req, res) {
  const { gameKey } = req.body;
  const games = req.app.games;
  if (!games.doesGameExist(gameKey)) {
    res.send({ doesGameExist: false });
    return;
  }
  res.send({ doesGameExist: true });
};

const joinGame = function(req, res) {
  const { playerName, gameKey } = req.body;
  const games = req.app.games;
  const game = games.getGame(gameKey);
  const id = generateGameKey();
  const player = new Player(playerName, id);
  game.getPlayers().addPlayer(player);
  res.cookie('gameKey', gameKey);
  res.cookie('id', id);
  res.end();
};

const servePlayerCards = function(req, res) {
  const { gameKey, id } = req.cookies;
  const game = req.app.games.getGame(gameKey);
  const cards = game.getPlayerCards(+id);
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
    if (!game.hasStarted()) {
      game.startGame(ld.shuffle);
    }

    res.redirect(`/game${game.playersCount}.html`);
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
  getTopDiscard,
  hostGame,
  validateGameKey,
  joinGame,
  serveLobby,
  servePlayerCards,
  handleGame
};
