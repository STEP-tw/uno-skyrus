const chai = require('chai');
const { Games } = require('../../src/models/games.js');
const { gameData } = require('./../testHelpers/testHelpers');

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
  let games;
  const game = { getKey: () => 1234 };

  beforeEach(function() {
    games = new Games();
    games.addGame(game);
  });

  it('should return game for given key', function() {
    const actual = games.getGame(1234);
    const expected = game;
    chai.assert.deepEqual(actual, expected);
  });

  it('doesGameExist method should return true when a game exists with a given key', function() {
    const actual = games.doesGameExist(1234);
    const expected = true;
    chai.assert.deepEqual(actual, expected);
  });

  it('doesGameExist method should return false when a game does not exist with a given key', function() {
    const actual = games.doesGameExist(123);
    const expected = false;
    chai.assert.deepEqual(actual, expected);
  });
});

describe('saveGame', function() {
  it('should call writeData method with proper arguments', function() {
    const games = new Games();
    const game = { getKey: () => '1234' };
    games.addGame(game);
    const writeData = function(gameKey) {
      chai.assert.equal(gameKey, '1234');
    };
    games.saveGame(writeData, '1234');
  });
});

describe('loadGame', () => {
  it('should load the game to the games class', () => {
    const games = new Games();
    games.loadGame(1234, gameData);
    chai.expect(games.games[0]).to.haveOwnProperty('players');
    games.loadGame(1234, gameData);
    chai.expect(games.games.length, 1);
  });
});
