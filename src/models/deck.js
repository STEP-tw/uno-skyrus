const {
  NumberedCard,
  WildCard,
  DrawTwo,
  SkipCard,
  ReverseCard,
  WildDrawFour
} = require('./card');
const REVERSE_SYMBOL = '&#8693';

const addNumberCards = function(colors, cards, number) {
  colors.forEach(color => {
    cards.push(new NumberedCard(number, color));
  });
  return cards;
};

const createDrawTwoCards = function() {
  const container = [];
  const colors = ['red', 'blue', 'green', 'yellow'];
  const cards = colors.map(color => new DrawTwo(color));
  return container.concat(cards, cards);
};

const createWildCards = function() {
  const wildCards = new Array(4).fill(0);
  return wildCards.map(() => {
    return new WildCard();
  });
};

const createWildDrawFourCards = function() {
  return new Array(4).fill().map(() => new WildDrawFour());
};

const createNumberCards = function() {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const colors = ['red', 'blue', 'green', 'yellow'];
  return numbers.reduce(addNumberCards.bind(null, colors), []);
};

const createSkipCards = function(symbol) {
  const container = [];
  const colors = ['red', 'blue', 'green', 'yellow'];
  const cards = colors.map(color => new SkipCard(symbol, color));
  return container.concat(cards, cards);
};

const createReverseCards = function(symbol) {
  const container = [];
  const colors = ['red', 'blue', 'green', 'yellow'];
  const cards = colors.map(color => new ReverseCard(symbol, color));
  return container.concat(cards, cards);
};

const createDeck = function(skipCardSymbol) {
  const deck = [];
  const numberCards = createNumberCards();
  const wildCards = createWildCards();
  const drawTwoCards = createDrawTwoCards();
  const skipCards = createSkipCards(skipCardSymbol);
  const reverseCards = createReverseCards(REVERSE_SYMBOL);
  const wildDrawFourCards = createWildDrawFourCards();

  return deck.concat(
    numberCards,
    wildCards,
    drawTwoCards,
    skipCards,
    reverseCards,
    wildDrawFourCards
  );
};

module.exports = { createDeck };
