const fs = require('fs');

const { generateGameKey } = require('../utils/util.js');
const { Player } = require('../models/player');
const { Game } = require('../models/game');
const { createDeck } = require('../models/deck');
const { Players } = require('../models/players.js');
const ld = require('lodash');
const { ActivityLog } = require('./../models/activityLog');

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
  const activityLog = new ActivityLog(gameKey, hostName);
  const game = new Game(deck, totalPlayers, gameKey, players, activityLog);

  req.app.games.addGame(game, gameKey);

  res.cookie('gameKey', gameKey);
  res.cookie('id', id);
  res.redirect(302, '/lobby');
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
  const player = game.getPlayers().getPlayer(id);
  const playableCards = player.getPlayableCardsFor(game.getTopDiscard());
  res.send({ cards, playableCards });
};

const serveLog = function(req, res) {
  const { gameKey } = req.cookies;
  const game = res.app.games.getGame(gameKey);
  const latestLog = game.activityLog.getLatestLog();
  res.set('Content-Type', 'text/plain');
  res.send(latestLog);
};

const haveAllPlayersJoined = function(game) {
  const joinedPlayers = game.getPlayers().getNumberOfPlayers();
  const playersCount = game.getPlayersCount();

  return joinedPlayers == playersCount;
};

const handleGame = function(req, res) {
  const { gameKey } = req.cookies;
  const game = req.app.games.getGame(gameKey);
  const playersCount = game.playersCount;

  if (haveAllPlayersJoined(game)) {
    if (!game.hasStarted()) {
      game.startGame(ld.shuffle);
    }

    res.redirect('/game');
    res.end();
    return;
  }
  const extractPlayersNames = function(game) {
    const players = game.getPlayers().getPlayers();
    return players.map(player => player.getName());
  };
  const playersNames = extractPlayersNames(game);
  const playersDetails = { playersCount, playersNames };
  res.send(playersDetails);
};

const serveLobby = function(req, res) {
  const { gameKey } = req.cookies;
  const modifiedLobby = LOBBY.replace('__gameKey__', gameKey);
  res.send(modifiedLobby);
  res.end();
};

const handleThrowCard = function(req, res) {
  const { gameKey, id } = req.cookies;
  const { cardId } = req.body;

  const game = req.app.games.getGame(gameKey);
  game.throwCard(id, cardId);
  res.end();
};

const drawCard = function(req, res) {
  const { gameKey, id } = req.cookies;
  const game = res.app.games.getGame(gameKey);
  game.drawCard(id);
  res.end();
};

const getPlayerNames = (req, res) => {
  const { gameKey, id } = req.cookies;
  const games = req.app.games;
  const game = games.getGame(gameKey);
  const players = game.getPlayers().getPlayers();
  const playerPosition = players.findIndex(player => player.id == id);

  const playerDetails = players.map(player => {
    return {
      name: player.name,
      isCurrent: game.getPlayers().isCurrent(player)
    };
  });

  res.send({ playerDetails, playerPosition });
};

const renderGamePage = function(req, res) {
  const { gameKey } = req.cookies;
  const game = req.app.games.getGame(gameKey);
  const playersCount = game.playersCount;

  const gamePage = fs.readFileSync(
    `./public/${playersCount}player_game.html`,
    'utf8'
  );

  res.send(gamePage);
};

module.exports = {
  getTopDiscard,
  hostGame,
  validateGameKey,
  joinGame,
  serveLobby,
  servePlayerCards,
  handleGame,
  handleThrowCard,
  getPlayerNames,
  drawCard,
  serveLog,
  renderGamePage
};
