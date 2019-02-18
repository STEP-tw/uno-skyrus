const Game = require('../../src/models/game.js');
const chai = require('chai');
const { Player } = require('../../src/models/player');

const {
  twoCards,
  dummyShuffler,
  numberDeck
} = require('../testHelpers/gameTestHelpers.js');

describe('Game Class', () => {
  describe('startGame', function() {
    let game;

    beforeEach(function() {
      game = new Game(twoCards);
      game.startGame(dummyShuffler);
    });

    it('startGame method should create stack', function() {
      const actual = game.stack;
      const expected = [{ color: 'green', number: 7 }];
      chai.assert.deepEqual(actual, expected);
    });

    it('startGame method should initialize pile', function() {
      const actual = game.pile;
      const expected = [{ color: 'red', number: 5 }];
      chai.assert.deepEqual(actual, expected);
    });

    it('should assign 7 cards to each player', function() {
      const game = new Game(numberDeck);
      const player = new Player('Reshmi');
      game.addPlayer(player);
      const identity = deck => deck;
      game.startGame(identity);
      const expectedOutput = [
        { number: 1, color: 'red' },
        { number: 2, color: 'green' },
        { number: 3, color: 'blue' },
        { number: 4, color: 'yellow' },
        { number: 5, color: 'red' },
        { number: 6, color: 'green' },
        { number: 7, color: 'blue' }
      ];
      const actualOutput = game.getPlayerCards('Reshmi');
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe('getTopDiscard', function() {
    it('getTopDiscard should return topDicard from pile', function() {
      const game = new Game(twoCards);
      game.startGame(dummyShuffler);
      const actual = game.getTopDiscard();
      const expected = { color: 'red', number: 5 };
      chai.assert.deepEqual(actual, expected);
    });
  });

  describe('addPlayer', function() {
    it('should add the given player to the game', function() {
      const game = new Game();
      const player = new Player('Reshmi');
      game.addPlayer(player);
      const expectedOutput = [{ name: 'Reshmi', cards: [] }];
      const actualOutput = game.getPlayers();
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe('getPlayerCards', function() {
    it('should return the cards of the given player', function() {
      const game = new Game();
      const player = new Player('Reshmi');
      game.addPlayer(player);
      const cards = twoCards;
      player.addCards(cards);
      const expectedOutput = [
        { number: 5, color: 'red' },
        { number: 7, color: 'green' }
      ];
      const actualOutput = game.getPlayerCards('Reshmi');
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});
