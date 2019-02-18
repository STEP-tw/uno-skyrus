const { generateGameKey } = require('../utils/util.js');

const initializePile = function(req, res) {
  const color = 'yellow';
  const number = 7;
  res.send({ color, number });
};

const hostGame = function(req, res) {
  const gameKey = generateGameKey();
  res.cookie('gameKey', gameKey);
  res.redirect(302, '/lobby.html');
  res.end();
};

module.exports = { initializePile, hostGame };
