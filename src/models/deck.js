const {
  NumberedCard,
  WildCard,
  DrawTwo,
  SkipCard,
  ReverseCard,
  WildDrawFour
} = require('./card');

const SYMBOLS = {
  SKIP_SYMBOL: '&#8856;',
  REVERSE_SYMBOL: '&#10150',
  WILD_SYMBOL: 'w',
  DRAW_TWO_SYMBOL: '&#8314;2',
  DRAW_FOUR_SYMBOL: '&#8314;4'
};

const addNumberCards = function(colors, cards, number) {
  colors.forEach(color => {
    cards.push(new NumberedCard(number, color));
  });
  return cards;
};

const createDrawTwoCards = function(symbol) {
  const container = [];
  const colors = ['red', 'blue', 'green', 'yellow'];
  const cards = colors.map(color => new DrawTwo(symbol, color));
  return container.concat(cards, cards);
};

const createWildCards = function(WILD_SYMBOL) {
  const wildCards = new Array(4).fill(0);
  return wildCards.map(() => {
    return new WildCard(WILD_SYMBOL);
  });
};

const createWildDrawFourCards = function(symbol) {
  return new Array(4).fill().map(() => new WildDrawFour(symbol));
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

const createDeck = function() {
  const deck = [];
  const numberCards = createNumberCards();
  const wildCards = createWildCards(SYMBOLS.WILD_SYMBOL);
  const drawTwoCards = createDrawTwoCards(SYMBOLS.DRAW_TWO_SYMBOL);
  const skipCards = createSkipCards(SYMBOLS.SKIP_SYMBOL);
  const reverseCards = createReverseCards(SYMBOLS.REVERSE_SYMBOL);
  const wildDrawFourCards = createWildDrawFourCards(SYMBOLS.DRAW_FOUR_SYMBOL);

  return deck.concat(
    numberCards,
    wildCards,
    reverseCards,
    drawTwoCards,
    skipCards,
    wildDrawFourCards
  );
};

module.exports = { createDeck };
