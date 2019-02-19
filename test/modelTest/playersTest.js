const { Players } = require('./../../src/models/players.js');
const chai = require('chai');

describe('addPlayer', function() {
  it('should add a player to the Players class', function() {
    const players = new Players({ name: 'hostName', cards: [] });
    players.addPlayer({ name: 'player1', cards: [] });

    const actualOutput = players.players;
    const expectedOutput = [
      { name: 'hostName', cards: [] },
      { name: 'player1', cards: [] }
    ];

    chai.assert.deepEqual(expectedOutput, actualOutput);
  });
});

describe('getCurrentPlayer', function() {
  it('should return current player', function() {
    const players = new Players({ name: 'hostName', cards: [] });
    const expectedOutput = { name: 'hostName', cards: [] };
    const actualOutput = players.getCurrentPlayer();

    chai.assert.deepEqual(expectedOutput, actualOutput);
  });
});

describe('getNumberOfPlayers', function() {
  it('should return numbers of all players', function() {
    const players = new Players({ name: 'hostName', cards: [] });
    const expectedOutput = 1;
    const actualOutput = players.getNumberOfPlayers();

    chai.assert.deepEqual(expectedOutput, actualOutput);
  });
  it('should return numbers of all players after addding players', function() {
    const players = new Players({ name: 'hostName', cards: [] });
    players.addPlayer({ name: 'player1', cards: [] });
    const expectedOutput = 2;
    const actualOutput = players.getNumberOfPlayers();

    chai.assert.deepEqual(expectedOutput, actualOutput);
  });
});

describe('getPlayers', function(){
  it('should return array of players' ,function(){
    const players = new Players({ name: 'hostName', cards: [] });
    const actualOutput = players.getPlayers();
    const expectedOutput = [{ name: 'hostName', cards: [] }];
    
    chai.assert.deepEqual(expectedOutput, actualOutput);
  });
});
