const ld = require('lodash');

const {
  initializePile,
  servePlayerCards,
  hostGame
} = require('./handlers/handleRequests.js');
const { Player } = require('./models/player');
const { createDeck } = require('./models/deck');
const express = require('express');
const app = express();
const Game = require('./models/game.js');
const bodyParser = require('body-parser');

const player = new Player('Reshmi');
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const colors = ['red', 'green', 'blue', 'yellow'];
const deck = createDeck(numbers, colors);
const game = new Game(deck);
game.addPlayer(player);
game.startGame(ld.shuffle);

const logRequest = function(req, res, next) {
  console.log(req.url);
  console.log(req.method);
  console.log(req.body);
  next();
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logRequest);
app.get('/pile', initializePile);
app.get('/playerCards', servePlayerCards.bind(null, game));
app.post('/hostGame', hostGame);
app.get('/pile', initializePile.bind(null, Game, createDeck, ld.shuffle));
app.use(express.static('public'));

module.exports = { app };
