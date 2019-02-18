const { Game } = require('../src/models/game');
const { Player } = require('../src/models/player');
const chai = require('chai');

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
    const cards = [{ number: 1, color: 'red' }, { number: 2, color: 'green' }];
    player.addCards(cards);
    const expectedOutput = [
      { number: 1, color: 'red' },
      { number: 2, color: 'green' }
    ];
    const actualOutput = game.getPlayerCards('Reshmi');
    chai.assert.deepEqual(actualOutput, expectedOutput);
  });
});

describe('dealCards', function() {
  it('should assign 7 cards to each player', function() {
    const deck = [
      { number: 1, color: 'red' },
      { number: 2, color: 'green' },
      { number: 3, color: 'blue' },
      { number: 4, color: 'yellow' },
      { number: 5, color: 'red' },
      { number: 6, color: 'green' },
      { number: 7, color: 'blue' },
      { number: 8, color: 'blue' }
    ];
    const game = new Game(deck);
    const player = new Player('Reshmi');
    game.addPlayer(player);
    const identity = deck => deck;
    game.dealCards(identity);
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
