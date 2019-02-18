const { initializePile, hostGame } = require('./handlers/handleRequests.js');
const express = require('express');
const app = express();
const Game = require('./models/game.js');
const { createDeck } = require('./models/deck.js');
const { shuffle } = require('lodash');
const bodyParser = require('body-parser');

const logRequest = function(req, res, next) {
  console.log(req.url);
  console.log(req.method);
  console.log(req.body);
  next();
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logRequest);
app.post('/hostGame', hostGame);
app.get('/pile', initializePile.bind(null, Game, createDeck, shuffle));
app.use(express.static('public'));

module.exports = { app };
