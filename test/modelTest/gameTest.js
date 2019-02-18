const Game = require('../../src/models/game.js');
const chai = require('chai');

describe('class Game', function() {
  const dummyDeck = [
    { color: 'red', number: 5 },
    { color: 'green', number: 7 }
  ];

  const dummyShuffler = function(deck) {
    const newDeck = deck.slice();
    const card = newDeck.shift();
    newDeck.push(card);
    return newDeck;
  };

  it('startGame method should create stack', function() {
    const game = new Game(dummyDeck);
    game.startGame(dummyShuffler);
    const actual = game.stack;
    const expected = [{ color: 'green', number: 7 }];
    chai.assert.deepEqual(actual, expected);
  });

  it('startGame method should initialize pile', function() {
    const game = new Game(dummyDeck);
    game.startGame(dummyShuffler);
    const actual = game.pile;
    const expected = [{ color: 'red', number: 5 }];
    chai.assert.deepEqual(actual, expected);
  });

  it('getTopDiscard should return topDicard from pile', function() {
    const game = new Game(dummyDeck);
    game.startGame(dummyShuffler);
    const actual = game.getTopDiscard();
    const expected = { color: 'red', number: 5 };
    chai.assert.deepEqual(actual, expected);
  });
});
