const { NumberedCard, WildCard, DrawTwo, SkipCard } = require('./card');

const addNumberCards = function(colors, cards, number) {
  colors.forEach(color => {
    cards.push(new NumberedCard(number, color));
  });
  return cards;
};

const createDrawTwoCards = function() {
  const colors = ['red', 'blue', 'green', 'yellow'];
  return colors.map(color => {
    return new DrawTwo(color);
  });
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

const createSkipCards = function() {
  const container = [];
  const colors = ['red', 'blue', 'green', 'yellow'];
  const cards = colors.map(color => new SkipCard(color));
  return container.concat(cards, cards);
};

const createDeck = function() {
  const deck = [];
  const numberCards = createNumberCards();
  const wildCards = createWildCards();
  const drawTwoCards = createDrawTwoCards();
  const skipCards = createSkipCards();
  return deck.concat(numberCards, wildCards, drawTwoCards, skipCards);
};

module.exports = { createDeck };
