const twoCards = [{ color: 'red', number: 5 }, { color: 'green', number: 7 }];

const dummyShuffler = function(deck) {
  const newDeck = deck.slice();
  const card = newDeck.shift();
  newDeck.push(card);
  return newDeck;
};

const numberDeck = [
  { number: 1, color: 'red' },
  { number: 2, color: 'green' },
  { number: 3, color: 'blue' },
  { number: 4, color: 'yellow' },
  { number: 5, color: 'red' },
  { number: 6, color: 'green' },
  { number: 7, color: 'blue' },
  { number: 8, color: 'blue' },
  { number: 9, color: 'green' }
];

module.exports = { twoCards, dummyShuffler, numberDeck };
