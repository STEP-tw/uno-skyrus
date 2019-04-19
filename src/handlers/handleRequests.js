const fs = require('fs');

// ADD AI IMPORTS ------------------------
const { EasyAi } = require('../models/EasyAi');
const { HardAi } = require('../models/HardAi');
// ---------------------------------------

const { generateGameKey, writeData, loadData } = require('../utils/util.js');
const { Player } = require('../models/player');
const { Game } = require('../models/game');
const { createDeck } = require('../models/deck');
const { Players } = require('../models/players.js');
const ld = require('lodash');
const { ActivityLog } = require('./../models/activityLog');
const { URLS } = require('../constants.js');

const LOBBY = fs.readFileSync('./public/lobby.html', 'utf8');

const hostGame = function(req, res) {
  const gameKey = generateGameKey();
  const { hostName, totalPlayers } = req.body;
  const id = generateGameKey();
  const host = new Player(hostName, id);
  const players = new Players(host);
  const deck = createDeck();
  const activityLog = new ActivityLog([{ action: 'start-game', hostName }]);
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
    res.send({
      doesGameExist: false
    });
    return;
  }
  res.send({
    doesGameExist: true
  });
};

const joinGame = function(req, res) {
  const { playerName, gameKey } = req.body;
  const games = req.app.games;
  const game = games.getGame(gameKey);
  const id = generateGameKey();
  if (!game.hasStarted()) {
    const player = new Player(playerName, id);
    game.addPlayer(player);
  }
  res.cookie('gameKey', gameKey);
  res.cookie('id', id);
  res.send({ hasGameStarted: game.hasStarted() });
};

//ADD ARTIFICIAL INTELLIGENCE ---------------------
const addAiEasy = function(req, res) {
	const {gameKey, id } = req.cookies;
	const game = req.app.games.getGame(gameKey);

	//Get player names for the ai-id
  const players = game.getPlayers().getPlayers();
	const playersNames = players.map(player => player.getName());

	const aiID = generateGameKey();

	const aiNames = ["Sarah-Computer", "Jack-Computer", "Paul-Computer", "Olivia-Computer", "Lily-Computer", "Daniel-Computer", "Martin-Computer", "Matthew-Computer", "Adam-Computer", "David-Computer"];
	const ai = new EasyAi(aiNames[Math.floor(Math.random() * 10)], aiID, game);
	game.addPlayer(ai);
	res.send({hasGameStarted: game.hasStarted()});
};

const addAiHard = function(req, res) {
	const {gameKey, id } = req.cookies;
	const game = req.app.games.getGame(gameKey);

	//Get player names for the ai-id
	const extractPlayersNames = function(game) {
    const players = game.getPlayers().getPlayers();
    return players.map(player => player.getName());
  };
  const playersNames = extractPlayersNames(game);
	const aiID = generateGameKey();

	const aiNames = ["Sarah-Computer", "Jack-Computer", "Paul-Computer", "Olivia-Computer", "Lily-Computer", "Daniel-Computer", "Martin-Computer", "Matthew-Computer", "Adam-Computer", "David-Computer"];
	const ai = new HardAi(aiNames[Math.floor(Math.random() * 10)], aiID, game);
	game.addPlayer(ai);
	res.send({hasGameStarted: game.hasStarted()});
};

const removeAi = function(req, res) {
	const { gameKey, id } = req.cookies;
  const game = res.app.games.getGame(gameKey);
	const players = game.getPlayers().getPlayers();
	var i;
	for(i = players.length-1; i != 0; i--){
		if(players[i].getName().length > 10){
			game.leaveGame(players[i].getId());
			break;
		}
	}
	res.send(players[i].getName() + " named ai has removed");
	res.end();
};

const aiListener = function(req, res){
  const { gameKey, id } = req.cookies;
  const game = req.app.games.getGame(gameKey);
  const players = game.getPlayers().getPlayers();

  for(var i = 0; i < players.length; i++){
    if(players[i].getName().length > 10 && game.getPlayers().isCurrent(players[i])){
			const ai = players[i];
			ai.move();
    }
  }

	res.end();
};
//------------------------------------------------


const servePlayerCards = function(req, res) {
  const { gameKey, id } = req.cookies;
  const game = req.app.games.getGame(gameKey);
  const cards = game.getPlayerCards(+id);
  const player = game.getPlayers().getPlayer(id);
  let playableCards = [];

	//GETTING SCORE -------
	const score = player.calculateScore();
	// --------------------

  if (
    game
      .getPlayers()
      .getCurrentPlayer()
      .getId() == id
  ) {
    playableCards = player.getPlayableCards();
  }
  res.send({
    cards,
    playableCards,
		//ADDED PLAYER SCORE ---------
		score
  });
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
  const status = game.activityLog.getLatestLog();

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
  const playersDetails = {
    playersCount,
    playersNames
  };
  res.send({ playersDetails, status });
};

const serveLobby = function(req, res) {
  const { gameKey } = req.cookies;
  const modifiedLobby = LOBBY.replace('__gameKey__', gameKey);
  res.send(modifiedLobby);
  res.end();
};

const handleThrowCard = function(req, res) {
  const { gameKey, id } = req.cookies;
  const { cardId, calledUno, declaredColor } = req.body;

  const game = req.app.games.getGame(gameKey);
  game.throwCard(id, cardId, calledUno);

  if (declaredColor) {
    game.updateRunningColor(id, declaredColor);
  }

  res.end();
};

const drawCard = function(req, res) {
  const { gameKey, id } = req.cookies;
  const game = res.app.games.getGame(gameKey);
  const playableCards = game.drawCards(id);
  const stackLength = game.getStack().length;
  if (!stackLength) {
    game.refillStack();
  }
  const cards = game.getPlayerCards(+id);
  res.send({
    cards,
    playableCards
  });
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
      isCurrent: game.getPlayers().isCurrent(player),
      cardsCount: player.getCardsCount(),
			//ADDED and STATISTICS--------
			score: player.calculateScore(),
			maxCard: player.getMaxCard(player.getCardsCount()),
			thrownCards: player.getThrownCards()
			//----------------------------------
    };
  });

  res.send({
    playerDetails,
    playerPosition
  });
};

const renderGamePage = function(req, res) {
  const { gameKey } = req.cookies;
  const game = req.app.games.getGame(gameKey);
  const playersCount = game.numberOfPlayersJoined;

  const gamePage = fs.readFileSync(
    `./public/${playersCount}player_game.html`,
    'utf8'
  );

  res.send(gamePage);
};

const hasDrawn = function(player) {
  return !player.getDrawCardStatus();
};

const isCurrentPlayer = function(game, player) {
  return game.getPlayers().isCurrent(player);
};

const passTurn = function(req, res) {
  const { gameKey, id } = req.cookies;
  const game = req.app.games.getGame(gameKey);
  const player = game.getPlayers().getPlayer(id);

  if (hasDrawn(player) && isCurrentPlayer(game, player)) {
    game.getPlayers().changeTurn();
    game.updatePlayableCards();
  }
  res.end();
};

const serveGameLog = function(game) {
  const latestLog = game.activityLog.getLatestLog();
  return latestLog;
};

const getTopDiscard = function(game) {
  const topDiscard = game.getTopDiscard();
  return topDiscard;
};

const getRunningColor = function(game) {
  const runningColor = game.getRunningColor();
  return runningColor;
};

const serveGameStatus = function(req, res) {
  const { gameKey, id } = req.cookies;
  const game = res.app.games.getGame(gameKey);

  const gameLog = serveGameLog(game);
  const topDiscard = getTopDiscard(game);
  const victoryStatus = game.victoryStatus();
  const runningColor = getRunningColor(game);
  const saveStatus = getSaveStatus(game, id);
  const playersCount = game.numberOfPlayersJoined;
  const player = game.getPlayers().getPlayer(id);
  const isCurrent = isCurrentPlayer(game, player);
  res.send({
    gameLog,
    topDiscard,
    runningColor,
    victoryStatus,
    saveStatus,
    playersCount,
    isCurrent
  });
};

const saveGame = function(req, res) {
  const { gameKey } = req.cookies;
  const games = res.app.games;
  games.saveGame(writeData.bind(null, fs), gameKey);
  games.getGame(gameKey).updateSaveStatus();
  res.end();
};

const catchPlayer = function(req, res) {
  const { gameKey, id } = req.cookies;
  const game = res.app.games.getGame(gameKey);
  game.catchPlayer(id);
  res.end();
};

const loadGame = function(req, res) {
  const { gameKey, id } = req.body;
  const games = req.app.games;
  loadData(fs, gameKey, games.loadGame.bind(games));
  res.cookie('gameKey', gameKey);
  res.cookie('id', id);
  res.redirect('/game');
  res.end();
};

const getSaveStatus = function(game, playerId) {
  const { status, lastSaved } = game.getSaveStatus();
  const saveStatus = {
    status: status
  };
  if (status) {
    saveStatus.lastSaved = lastSaved;
    saveStatus.gameKey = game.getKey();
    saveStatus.playerId = playerId;
  }
  return saveStatus;
};

const leaveGame = function(req, res) {
  const { gameKey, id } = req.cookies;
  const game = res.app.games.getGame(gameKey);
  game.leaveGame(id);
  res.clearCookie('gameKey');
  res.clearCookie('id');
  res.end();
};

const servePlayersCount = function(req, res) {
  const { gameKey } = req.cookies;
  const game = req.app.games.getGame(gameKey);
  const playersCount = game.numberOfPlayersJoined;
  res.send({ playersCount });
};

const isProhibited = (game, url) => game.hasStarted() && !URLS.includes(url);

const restrictAccess = function(req, res, next) {
  const { gameKey } = req.cookies;
  const game = req.app.games.getGame(gameKey);
  if (!game) {
    next();
    return;
  }

  if (isProhibited(game, req.url)) {
    res.redirect('/game');
    return;
  }
  next();
};

const updateRunningColor = function(req, res) {
  const { declaredColor } = req.body;
  const { gameKey, id } = req.cookies;
  const game = res.app.games.getGame(gameKey);
  game.updateRunningColor(id, declaredColor);

  res.end();
};

// OUR REQUESTS -------------------------------------------

const addChat = function(req, res){
	const { gameKey, id } = req.cookies;
    const game = req.app.games.getGame(gameKey);

	//Getting the objects
	const array = game.getChat();
	var message = req.body;

	const players = game.getPlayers().getPlayers();
	const playerPosition = players.findIndex(player => player.id == id);
	const playerDetails = players.map(player => {
      return {
        name: player.name,
        isCurrent: game.getPlayers().isCurrent(player),
        cardsCount: player.getCardsCount()
      };
    });

	array.push({from: playerDetails[playerPosition].name, msg: message.text, color: playerPosition});
	game.setChat(array);
	res.send(game.getChat());
};

const serveChat = function(req, res) {
	const { gameKey } = req.cookies;
    const game = req.app.games.getGame(gameKey);
	const chat = JSON.stringify(game.getChat());
	res.send(chat);
};



//---------------------------------------------------------

module.exports = {
  hostGame,
  validateGameKey,
  joinGame,
  serveLobby,
  servePlayerCards,
  handleGame,
  handleThrowCard,
  getPlayerNames,
  drawCard,
  serveGameStatus,
  renderGamePage,
  passTurn,
  saveGame,
  catchPlayer,
  loadGame,
  leaveGame,
  servePlayersCount,
  restrictAccess,
  updateRunningColor,
  addChat,
  serveChat,
	//ARTIFICIAL INTELLIGENCE--------------------------
	addAiEasy,
	addAiHard,
	removeAi,
  aiListener
//-------------------------------------------------
};
