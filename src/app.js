const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { Games } = require('./models/games');
const { logRequest } = require('./handlers/logger');

const {
  servePlayerCards,
  hostGame,
  validateGameKey,
  joinGame,
  serveLobby,
  handleGame,
  handleThrowCard,
  serveGameStatus,
  drawCard,
  getPlayerNames,
  renderGamePage,
  passTurn,
  updateRunningColor,
  saveGame,
  catchPlayer,
  loadGame,
  leaveGame,
  servePlayersCount
} = require('./handlers/handleRequests');

const app = express();
app.games = new Games();
const options = { extensions: ['html'] };

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logRequest);
app.get('/game', renderGamePage);
app.get('/playerCards', servePlayerCards);
app.post('/throwCard', handleThrowCard);
app.post('/hostGame', hostGame);
app.post('/validateGameKey', validateGameKey);
app.post('/joinGame', joinGame);
app.get('/saveGame', saveGame);
app.post('/loadGame', loadGame);
app.post('/updateRunningColor', updateRunningColor);
app.get('/getPlayerNames', getPlayerNames);
app.get('/playersStatus', handleGame);
app.get('/gameStatus', serveGameStatus);
app.get('/lobby', serveLobby);
app.get('/drawCard', drawCard);
app.get('/passTurn', passTurn);
app.get('/catch', catchPlayer);
app.get('/leaveGame', leaveGame);
app.get('/playersCount', servePlayersCount);
app.use(express.static('public', options));

module.exports = { app };
