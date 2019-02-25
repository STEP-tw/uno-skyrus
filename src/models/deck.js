const { NumberedCard, WildCard } = require('./card');

const createNumberedCards = function(colors, cards, number) {
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

const addCardToDeck = (deck, card) => {
  deck.push(card);
  return deck;
};

const createDeck = function(numbers, colors) {
  const deck = numbers.reduce(createNumberedCards.bind(null, colors), []);
  const wildCards = createWildCards();
  return wildCards.reduce(addCardToDeck, deck);
};

module.exports = { createDeck };
