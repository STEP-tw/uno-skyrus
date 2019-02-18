const initializePile = function(req, res) {
  const color = 'yellow';
  const number = 7;
  res.send({ color, number });
};

module.exports = { initializePile };
