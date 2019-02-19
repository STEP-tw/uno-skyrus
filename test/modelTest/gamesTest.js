const chai = require('chai');
const { Games } = require('../../src/models/games.js');

describe('games', function() {
  const games = new Games();
  const game = {
    getKey: () => 1234
  };
  it('should add a new game', function() {
    games.addGame(game);
    const actual = games.games;
    const expected = [game];
    chai.assert.deepEqual(actual, expected);
  });
});

describe('games', function() {
  const games = new Games();
  const game = {
    getKey: () => 1234
  };
  games.addGame(game);
  it('should return game for given key', function() {
    const actual = games.getGame(1234);
    const expected = game;
    chai.assert.deepEqual(actual, expected);
  });
});
