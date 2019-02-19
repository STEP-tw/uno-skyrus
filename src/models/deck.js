const { NumberedCard } = require('./card');

const createNumberedCards = function(colors, cards, number) {
  colors.forEach(color => {
    cards.push(new NumberedCard(number, color));
  });
  return cards;
};

const createDeck = function(numbers, colors) {
  return numbers.reduce(createNumberedCards.bind(null, colors), []);
};

module.exports = { createDeck };
