const { NumberedCard } = require('./card');

const createCard = function(cards, number, color) {
  cards.push(new NumberedCard(number, color));
  return cards;
};

const reducer = function(colors, cards, number) {
  colors.forEach(color => {
    createCard(cards, number, color);
  });
  return cards;
};

const createDeck = function(numbers, colors) {
  return numbers.reduce(reducer.bind(null, colors), []);
};

module.exports = { createDeck };
