const { NumberedCard } = require('./card');

const createDeck = function(numbers, colors) {
  const deck = [];
  numbers.forEach(number => {
    colors.forEach(color => {
      deck.push(new NumberedCard(number, color));
    });
  });
  return deck;
};

module.exports = { createDeck };
