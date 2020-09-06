const { Players } = require('./../../src/models/players.js');
const chai = require('chai');
const sinon = require('sinon');

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
    players.addPlayer({ name: 'Aftab', cards: [] });
    players.setCurrentPlayer();
    const expectedOutput = { name: 'Aftab', cards: [] };
    const actualOutput = players.getCurrentPlayer();
    chai.assert.deepEqual(expectedOutput, actualOutput);
  });
});

describe('getLastPlayer', function() {
  it('should return current player', function() {
    const host = { name: 'Aftab', cards: [] };
    const players = new Players(host);
    const expectedOutput = { name: 'Aftab', cards: [] };
    const actualOutput = players.getLastPlayer();
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
describe('getPlayersCount', function() {
  it('should return number of players', function() {
    const players = new Players({ name: 'hostName', cards: [], id: 1234 });
    const actualOutput = players.getPlayersCount();
    const expectedOutput = 1;

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
      cards: [],
      setDrawCardStatus: () => {}
    };
    const thrownCard = {
      action: currentPlayerIndex => {
        return { updatedIndex: ++currentPlayerIndex };
      }
    };

    const hostPlayer = {
      name: 'Aftab',
      cards: [],
      id: 1234,
      setDrawCardStatus: () => {}
    };
    const players = new Players(hostPlayer);
    players.currentPlayerIndex = 0;
    players.addPlayer(player);
    players.addPlayer(player);
    players.setCurrentPlayer();
    players.updateCurrentPlayer(thrownCard);
    const actualOutput = players.getCurrentPlayer();
    const expectedOutput = player;
    chai.assert.deepEqual(expectedOutput, actualOutput);
  });

  it('should update the turnDirection', function() {
    const player = {
      name: 'Rahul',
      id: 1212,
      cards: [],
      setDrawCardStatus: () => {}
    };
    const thrownCard = {
      action: currentPlayerIndex => {
        return {
          updatedIndex: ++currentPlayerIndex,
          players: [player, hostPlayer]
        };
      }
    };

    const hostPlayer = {
      name: 'Aftab',
      cards: [],
      id: 1234,
      setDrawCardStatus: () => {}
    };
    const players = new Players(hostPlayer);
    players.currentPlayerIndex = 0;
    players.addPlayer(player);
    players.addPlayer(player);
    players.setCurrentPlayer();
    players.updateCurrentPlayer(thrownCard);
    const actualOutput = players.getCurrentPlayer();
    const expectedOutput = player;
    chai.assert.deepEqual(expectedOutput, actualOutput);
  });

  it('should update the turnDirection even if currentPlayer index is negative', function() {
    const player = {
      name: 'Rahul',
      id: 1212,
      cards: [],
      setDrawCardStatus: () => {}
    };
    const thrownCard = {
      action: (turnDirection, currentPlayerIndex) => {
        return {
          turnDirection: -1,
          updatedIndex: ++currentPlayerIndex
        };
      }
    };

    const hostPlayer = {
      name: 'Aftab',
      cards: [],
      id: 1234,
      setDrawCardStatus: () => {}
    };
    const players = new Players(hostPlayer);
    players.currentPlayerIndex = -1;
    players.addPlayer(player);
    players.addPlayer(player);
    players.setCurrentPlayer();
    players.updateCurrentPlayer(thrownCard);
    const actualOutput = players.getCurrentPlayer();
    const expectedOutput = hostPlayer;
    chai.assert.deepEqual(expectedOutput, actualOutput);
  });
});

describe('isCurrent', function() {
  it('should return true for current player', function() {
    const players = new Players({
      name: 'Rahul',
      cards: [],
      id: '1234'
    });
    players.addPlayer({ name: 'Affi', cards: [], id: '2345' });
    players.addPlayer({ name: 'Affi', cards: [], id: '2345' });
    players.setCurrentPlayer();
    const expectedOutput = true;
    const actualOutput = players.isCurrent({
      name: 'Affi',
      cards: [],
      id: '2345'
    });
    chai.assert.equal(actualOutput, expectedOutput);
  });
});

describe('changeTurn', function() {
  it('should change current player', function() {
    const players = new Players({
      name: 'hostName',
      cards: [],
      id: 1234,
      setDrawCardStatus: () => {}
    });
    players.currentPlayer = { setDrawCardStatus: () => {} };
    players.changeTurn();
    const actualOutput = players.currentPlayerIndex;

    chai.assert.deepEqual(0, actualOutput);
  });
  it('should change current player even after a compleate turn', function() {
    const players = new Players({
      name: 'hostName',
      cards: [],
      id: 1234
    });
    players.currentPlayer = { setDrawCardStatus: () => {} };
    players.players = [
      { name: 'player', setDrawCardStatus: () => {} },
      { name: 'player', setDrawCardStatus: () => {} }
    ];
    players.changeTurn();
    const actualOutput = players.currentPlayerIndex;

    chai.assert.deepEqual(0, actualOutput);
  });
});

describe('removePlayer', function() {
  it('should remove the player with the given player id', function() {
    const players = new Players({
      name: 'hostName',
      id: 12,
      cards: [],
      getId: () => 12
    });
    players.removePlayer(12);
    const actualOutput = players.getPlayers();
    const expectedOutput = [];
    chai.assert.deepEqual(actualOutput, expectedOutput);
  });
});

describe('resetLastPlayerUnoCall', function() {
  it('should reset last player\s uno call', function() {
    const players = new Players({
      name: 'hostName',
      id: 12,
      cards: [],
      unoCallStatus: true,
      resetUnoCall: sinon.spy()
    });
    players.resetLastPlayerUnoCall();
    sinon.assert.calledOnce(players.getLastPlayer().resetUnoCall);
  });
});
