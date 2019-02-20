const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { Games } = require('./models/games');
const { logRequest } = require('./handlers/logger');

const {
  getTopDiscard,
  servePlayerCards,
  hostGame,
  validateGameKey,
  joinGame,
  serveLobby,
  handleGame,
  handleThrowCard
} = require('./handlers/handleRequests');

const app = express();
app.games = new Games();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logRequest);
app.get('/playerCards', servePlayerCards);
app.post('/throwCard', handleThrowCard);
app.post('/hostGame', hostGame);
app.post('/validateGameKey', validateGameKey);
app.post('/joinGame', joinGame);
app.get('/pile', getTopDiscard);
app.get('/playersStatus', handleGame);
app.get('/lobby.html', serveLobby);
app.use(express.static('public'));

module.exports = { app };
