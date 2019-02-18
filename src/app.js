const ld = require('lodash');

const {
  initializePile,
  servePlayerCards
} = require('./handlers/handleRequests.js');
const { Game } = require('./models/game');
const { Player } = require('./models/player');
const { createDeck } = require('./models/deck');
const express = require('express');
const app = express();

const player = new Player('Reshmi');
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const colors = ['red', 'green', 'blue', 'yellow'];
const deck = createDeck(numbers, colors);
const game = new Game(deck);
game.addPlayer(player);
game.dealCards(ld.shuffle);

app.get('/pile', initializePile);
app.get('/playerCards', servePlayerCards.bind(null, game));
app.use(express.static('public'));

module.exports = app;
