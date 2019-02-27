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
    players.addPlayer({ name: 'Aftab', cards: [] });
    players.setCurrentPlayer();
    const expectedOutput = { name: 'Aftab', cards: [] };
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

  it('should update the players array which consist of turn', function() {
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
