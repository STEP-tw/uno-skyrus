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

describe('getPlayers', function() {
  it('should return array of players', function() {
    const players = new Players({ name: 'hostName', cards: [] });
    const actualOutput = players.getPlayers();
    const expectedOutput = [{ name: 'hostName', cards: [] }];

    chai.assert.deepEqual(expectedOutput, actualOutput);
  });
});

describe('getPlayers', function() {
  it('should return array of players', function() {
    const players = new Players({ name: 'hostName', cards: [], id: 1234 });
    const actualOutput = players.getPlayer(1234);
    const expectedOutput = { name: 'hostName', cards: [], id: 1234 };

    chai.assert.deepEqual(expectedOutput, actualOutput);
  });
});

describe('setCurrentPlayer', function() {
  
  it('should set the current player as first joined player', function() {
    const player = {
      name: 'Rahul',
      id: 1212,
      cards: []
    };
    const hostPlayer = { name: 'Aftab', cards: [], id: 1234 };
    const players = new Players(hostPlayer);
    players.addPlayer(player);
    players.setCurrentPlayer();
    const actualOutput = players.getCurrentPlayer();
    const expectedOutput = {
      name: 'Rahul',
      id: 1212,
      cards: []
    };
    chai.assert.deepEqual(expectedOutput, actualOutput);
  });

  it('should update current player', function() {
    const player = {
      name: 'Rahul',
      id: 1212,
      cards: []
    };
    const thrownCard = {
      action: currentPlayerIndex => {
        return ++currentPlayerIndex;
      }
    };
    const hostPlayer = { name: 'Aftab', cards: [], id: 1234 };
    const players = new Players(hostPlayer);
    players.addPlayer(player);
    players.setCurrentPlayer();
    players.updateCurrentPlayer(thrownCard);
    const actualOutput = players.getCurrentPlayer();
    const expectedOutput = hostPlayer;
    chai.assert.deepEqual(expectedOutput, actualOutput);
  });
});
