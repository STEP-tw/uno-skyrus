const { initializePile } = require('./handlers/handleRequests.js');
const express = require('express');
const app = express();
const Game = require('./models/game.js');
const { createDeck } = require('./models/deck.js');
const { shuffle } = require('lodash');

app.get('/pile', initializePile.bind(null, Game, createDeck, shuffle));
app.use(express.static('public'));

module.exports = app;
