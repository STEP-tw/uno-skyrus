const { NumberedCard, WildCard } = require('./card');

const addNumberCards = function(colors, cards, number) {
  colors.forEach(color => {
    cards.push(new NumberedCard(number, color));
  });
  return cards;
};

const createWildCards = function() {
  const wildCards = new Array(4).fill(0);
  return wildCards.map(() => {
    return new WildCard();
  });
};

const createNumberCards = function() {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const colors = ['red', 'blue', 'green', 'yellow'];
  return numbers.reduce(addNumberCards.bind(null, colors), []);
};

const createDeck = function() {
  const deck = [];
  const numberCards = createNumberCards();
  const wildCards = createWildCards();
  return deck.concat(numberCards, wildCards);
};

module.exports = { createDeck };
