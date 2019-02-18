const initializePile = function(req, res) {
  const color = 'yellow';
  const number = 7;
  res.send({ color, number });
};

const servePlayerCards = function(game, req, res) {
  const cards = game.getPlayerCards('Reshmi');
  res.send(cards);
};

module.exports = { initializePile, servePlayerCards };
