const request = require('supertest');
const { app } = require('../../src/app');
const sinon = require('sinon');
const chai = require('chai');

describe('homepage', function() {
  it('should return 200 status code for homepage', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .expect('content-type', 'text/html; charset=UTF-8')
      .expect(/Start Game/)
      .end(done);
  });
});

describe('hostGame', function() {
  it('should redirect to lobby', function(done) {
    const games = {
      addGame: () => {},
      getGame: () => {}
    };
    app.games = games;
    request(app)
      .post('/hostGame')
      .expect(302)
      .expect('content-type', 'text/plain; charset=utf-8')
      .expect('Location', '/lobby')
      .end(done);
  });
});

describe('gamepage', function() {
  beforeEach(function() {
    const games = {};
    const game = {
      playersCount: 2,
      numberOfPlayersJoined: 2
    };
    games.getGame = sinon.stub();
    games.getGame.withArgs('1234').returns(game);

    app.games = games;
  });
  it('should return 200 status code for gamepage and give the template according to the number of players', function(done) {
    request(app)
      .get('/game')
      .set('Cookie', 'gameKey=1234')
      .expect(200)
      .expect('content-type', 'text/html; charset=utf-8')
      .end(done);
  });
});

describe('playerCards', function() {
  beforeEach(function() {
    const cards = [{ color: 'red', number: 3 }];
    const games = {};
    const player = {
      name: 'player',
      id: 123,
      getId: sinon.stub().returns(123),
      getPlayableCards: () => [{ color: 'red', number: 2 }]
    };
    const game = {
      addPlayer: () => {},
      getTopDiscard: () => {
        return {
          color: 'red',
          number: 5
        };
      },
      getPlayers: () => {
        return {
          getPlayers: () => [player],
          getPlayer: () => player,
          getCurrentPlayer: sinon.stub().returns(player)
        };
      },
      getPlayerCards: sinon
        .stub()
        .withArgs('player')
        .returns(cards)
    };
    games.getGame = sinon.stub().returns(game);
    games.getGame.withArgs('1234').returns(game);

    app.games = games;
  });

  it('should return 200 status code for playerCards request and json content-type', function(done) {
    request(app)
      .get('/playerCards')
      .set('Cookie', 'gameKey=1234')
      .set('Cookie', 'id=123')
      .expect(200)
      .expect('content-type', 'application/json; charset=utf-8')
      .expect({
        cards: [{ color: 'red', number: 3 }],
        playableCards: [{ color: 'red', number: 2 }]
      })
      .end(done);
  });
  it('should return 200 status code for playerCards request and json content-type', function(done) {
    request(app)
      .get('/playerCards')
      .set('Cookie', 'gameKey=1234')
      .set('Cookie', 'id=123')
      .expect(200)
      .expect('content-type', 'application/json; charset=utf-8')
      .expect({
        cards: [{ color: 'red', number: 3 }],
        playableCards: [{ color: 'red', number: 2 }]
      })
      .end(done);
  });

  it('should return 200 status code for playerCards request and json content-type', function(done) {
    request(app)
      .get('/playerCards')
      .set('Cookie', 'gameKey=1234')
      .set('Cookie', 'id=12')
      .expect(200)
      .expect('content-type', 'application/json; charset=utf-8')
      .expect({
        cards: [{ color: 'red', number: 3 }],
        playableCards: []
      })
      .end(done);
  });
});

describe('joinGame', function() {
  const game = {};
  beforeEach(function() {
    const games = {};

    const players = {};
    players.addPlayer = sinon.stub();

    game.getPlayers = sinon.stub();
    game.getPlayers.returns(players);
    game.addPlayer = sinon.stub();

    game.hasStarted = sinon.stub().returns(false);
    games.doesGameExist = sinon.stub();
    games.doesGameExist.withArgs(1234).returns(true);
    games.doesGameExist.returns(false);
    games.getGame = sinon.stub();
    games.getGame.withArgs(1234).returns(game);

    app.games = games;
  });

  it('should response with hasGameStarted status as false', function(done) {
    request(app)
      .post('/joinGame')
      .send({ playerName: 'Rishab', gameKey: 1234 })
      .expect(200)
      .expect({ hasGameStarted: false })
      .end(done);
  });

  it('should response with hasGameStarted status as true', function(done) {
    game.hasStarted = () => true;
    request(app)
      .post('/joinGame')
      .send({ playerName: 'Rishab', gameKey: 1234 })
      .expect(200)
      .expect({ hasGameStarted: true })
      .end(done);
  });
});

describe('validateGameKey', function() {
  beforeEach(function() {
    const games = {};
    const game = { addPlayer: () => {} };

    games.doesGameExist = sinon.stub();
    games.doesGameExist.withArgs(1234).returns(true);
    games.doesGameExist.returns(false);

    games.getGame = sinon.stub();
    games.getGame.withArgs(1234).returns(game);

    app.games = games;
  });

  it('should respond with 200 status code and game does not exist if provided game key is invalid', function(done) {
    request(app)
      .post('/validateGameKey')
      .send({ playerName: 'Rishab', gameKey: 0 })
      .expect(200)
      .expect({ doesGameExist: false })
      .expect('content-type', 'application/json; charset=utf-8')
      .end(done);
  });

  it('should respond with 200 status code and game exist if provided game key is valid', function(done) {
    request(app)
      .post('/validateGameKey')
      .send({ playerName: 'Rishab', gameKey: 1234 })
      .expect(200)
      .expect({ doesGameExist: true })
      .expect('content-type', 'application/json; charset=utf-8')
      .end(done);
  });
});

describe('serveLobby', function() {
  it('should return 200 status code for serveLog', function(done) {
    request(app)
      .get('/lobby')
      .set('Cookie', 'gameKey=1234')
      .expect(200)
      .expect('content-type', 'text/html; charset=utf-8')
      .expect(/Game key/)
      .end(done);
  });
});

describe('player Status', function() {
  beforeEach(() => {
    const games = {
      '1234': {
        getPlayers: () => {
          return { getNumberOfPlayers: sinon.stub().returns(1) };
        },
        activityLog: { getLatestLog: () => {} },
        getPlayersCount: sinon.stub().returns(1),
        startGame: () => {},
        hasStarted: () => true
      },

      '5678': {
        getPlayers: () => {
          return {
            getNumberOfPlayers: sinon.stub().returns(2),
            getPlayers: () => [{ getName: () => 'name' }]
          };
        },
        activityLog: { getLatestLog: () => { } },
        getPlayersCount: sinon.stub().returns(1),
        hasStarted: () => false
      },
      '2345': {
        getPlayers: () => {
          return { getNumberOfPlayers: sinon.stub().returns(2) };
        },
        activityLog: { getLatestLog: () => { } },
        getPlayersCount: sinon.stub().returns(2),
        hasStarted: () => false,
        startGame: () => {}
      },
      getGame: key => games[key]
    };
    app.games = games;
  });

  it('should redirect to the /game.html url when all players will be joined and game has started', function(done) {
    request(app)
      .get('/playersStatus')
      .set('Cookie', 'gameKey=1234')
      .expect(302)
      .end(done);
  });

  it('should wait for all players to join, if all players are not joined yet', function(done) {
    request(app)
      .get('/playersStatus')
      .set('Cookie', 'gameKey=5678')
      .expect(200)
      .end(done);
  });

  it('It should start the game if all players have been joined and should redirect', function(done) {
    request(app)
      .get('/playersStatus')
      .set('Cookie', 'gameKey=2345')
      .expect(302)
      .end(done);
  });
});

describe('Handle Throw Card', () => {
  beforeEach(() => {
    const games = {
      '1234': {
        throwCard: (playerId, cardId) => {
          chai.assert.equal(playerId, '5678');
          chai.assert.equal(cardId, '1');
        }
      },
      getGame: () => games[1234]
    };
    app.games = games;
  });
  it('should remove card from hand and add it to top of pile', done => {
    request(app)
      .post('/throwCard')
      .send({ cardId: '1' })
      .set('Cookie', 'gameKey=1234; id=5678')
      .expect(200)
      .end(done);
  });
});

describe('Handle Draw Card', () => {
  const card = {};
  let player, game;
  beforeEach(() => {
    player = {
      id: 123,
      getDrawCardStatus: () => true,
      setDrawCardStatus: () => {},
      setPlayableCards: () => {},
      getPlayableCards: () => []
    };
    const players = {
      getPlayer: () => player,
      changeTurn: () => {}
    };

    card.canPlayOnTopOf = sinon.stub().returns(true);

    game = {
      stack: [],
      pile: [1, 2, 3, 4],
      getPlayers: () => players,
      getTopDiscard: () => card,
      drawCards: () => {},
      getPlayerCards: () => [card],
      refillStack: () => {},
      getStack: () => {
        return [1, 2];
      },
      haveToDrawMultiple: () => false
    };

    const games = {
      1234: game,

      getGame: () => game
    };
    app.games = games;
  });
  it('should remove top card of stack and refill the stack from pile if stack gets empty', done => {
    game.stack = [];
    game.pile = [1, 2, 3, 4];
    game.drawCard = playerId => {
      chai.assert.equal(playerId, '5678');
    };
    game.getStack = () => [];
    game.refillStack = () => {
      this.stack = [1, 2, 3];
      this.pile = [4];
    };
    request(app)
      .get('/drawCard')
      .set('Cookie', 'gameKey=1234; id=5678')
      .expect(200)
      .end(done);
  });
  it('should remove card from stack and add it to the hand', done => {
    request(app)
      .get('/drawCard')
      .set('Cookie', 'gameKey=1234; id=5678')
      .expect(200)
      .end(done);
  });
  it('should remove card from stack and add it to the hand but not able to play', done => {
    card.canPlayOnTopOf = sinon.stub().returns(false);
    request(app)
      .get('/drawCard')
      .set('Cookie', 'gameKey=1234; id=5678')
      .expect(200)
      .end(done);
  });
  it('should not remove card from stack', done => {
    player.getDrawCardStatus = () => false;
    request(app)
      .get('/drawCard')
      .set('Cookie', 'gameKey=1234; id=5678')
      .expect(200)
      .end(done);
  });

  it('should remove top card of stack', done => {
    request(app)
      .get('/drawCard')
      .set('Cookie', 'gameKey=1234; id=5678')
      .expect(200)
      .end(done);
  });
});

describe('get players', () => {
  beforeEach(() => {
    const players = {
      getPlayers: () => [
        { name: 'Aftab', id: '5678', getCardsCount: () => {} },
        { name: 'Rahul', id: '2678', getCardsCount: () => {} }
      ],
      isCurrent: () => {}
    };

    const game = {
      getPlayers: () => players
    };

    const games = { getGame: () => game };

    app.games = games;
  });

  it('should return players list with names and my position', done => {
    request(app)
      .get('/getPlayerNames')
      .set('Cookie', 'gameKey=1234; id=5678')
      .expect(200)
      .end(done);
  });
});

describe('gameStatus', function() {
  it('should return gameStatus for the game', function(done) {
    const isCurrent = () => true;
    const players = {getPlayer: ()=>{}, isCurrent};
    const games = {
      1234: {
        activityLog: { getLatestLog: () => { return 'latest log'; } },
        getPlayers: () => players,
        getSaveStatus: () => {
          return { status: false };
        },
        getRunningColor: () => {
          return 'red';
        },
        getTopDiscard: () => {
          return { number: 9, color: 'red' };
        },
        victoryStatus: () => {},
        getPlayersCount: () => {}
      },
      getGame: () => {
        return games['1234'];
      }
    };

    app.games = games;
    request(app)
      .get('/gameStatus')
      .set('Cookie', 'gameKey=1234')
      .set('Cookie', 'id=123')      
      .expect(200)
      .expect('content-type', 'application/json; charset=utf-8')
      .end(done);
  });

  it('should return gameStatus for the game', function(done) {
    const isCurrent = () => true;
    const players = {getPlayer: ()=>{}, isCurrent};
    const games = {
      1234: {
        getKey: () => '1234',
        activityLog: {
          getLatestLog: () => {
            return 'latest log';
          }
        },
        getPlayers: () => players,

        getSaveStatus: () => {
          return { status: true, lastSaved: '2019-10-05 13:23:23' };
        },
        getRunningColor: () => {
          return 'red';
        },
        getTopDiscard: () => {
          return { number: 9, color: 'red' };
        },
        victoryStatus: () => {},
        getPlayersCount: () => {}
      },
      getGame: () => {
        return games['1234'];
      }
    };

    app.games = games;
    request(app)
      .get('/gameStatus')
      .set('Cookie', 'gameKey=1234')
      .expect(200)
      .expect('content-type', 'application/json; charset=utf-8')
      .end(done);
  });
});

describe('passTurn', function() {
  it('should pass the turn if the player don`t want to play', function(done) {
    const player = {
      id: 123,
      getDrawCardStatus: () => true
    };

    const players = {
      getPlayer: () => player,
      isCurrent: () => true
    };

    const games = {
      1234: {
        players: { changeTurn: () => {} },
        getPlayers: () => players
      },
      getGame: () => {
        return games['1234'];
      }
    };

    app.games = games;
    request(app)
      .get('/passTurn')
      .set('Cookie', 'gameKey=1234')
      .set('Cookie', 'id=123')
      .expect(200)
      .end(done);
  });

  it('should not pass the turn if the player is not the current player', function(done) {
    const player = {
      id: 123,
      getDrawCardStatus: () => false
    };

    const players = {
      getPlayer: () => player,
      isCurrent: () => true,
      changeTurn: () => {}
    };

    const games = {
      1234: {
        players: { changeTurn: () => {} },
        getPlayers: () => players,
        updatePlayableCards: () => {}
      },
      getGame: () => {
        return games['1234'];
      }
    };

    app.games = games;
    request(app)
      .get('/passTurn')
      .set('Cookie', 'gameKey=1234')
      .set('Cookie', 'id=123')
      .expect(200)
      .end(done);
  });
});

describe('/updateRunningColor', function() {
  beforeEach(function() {
    const games = {};
    const game = {
      runningColor: '',
      playersCount: 1,
      updateRunningColor: function(color) {
        this.runningColor = color;
      },
      getRunningColor: function() {
        return this.runningColor;
      },
      updatePlayableCards: function() {}
    };

    games.getGame = sinon.stub();
    games.getGame.withArgs('1234').returns(game);

    app.games = games;
  });
  it('should return 200 status code and update the running color with provided color', function(done) {
    request(app)
      .post('/updateRunningColor')
      .send({ declaredColor: 'red' })
      .set('Cookie', 'gameKey=1234')
      .expect(200)
      .end(done);
  });
});

describe('/saveGame', function() {
  beforeEach(() => {
    const game = {
      updateSaveStatus: () => {}
    };
    const games = {
      saveGame: (writeFun, gameKey) => {
        chai.assert.equal(gameKey, '1234');
      },
      getGame: () => game
    };
    app.games = games;
  });
  it('should call save game function in games', done => {
    request(app)
      .get('/saveGame')
      .set('Cookie', 'gameKey=1234; id=5678')
      .expect(200)
      .end(done);
  });
});
describe('/catch', function() {
  beforeEach(function() {
    const games = {};
    const game = {
      catchPlayer: () => {}
    };

    games.getGame = sinon.stub();
    games.getGame.withArgs('1234').returns(game);
    app.games = games;
  });
  it('should return 200 status code and update the running color with provided color', function(done) {
    request(app)
      .get('/catch')
      .set('Cookie', 'gameKey=1234')
      .expect(200)
      .end(done);
  });
});

describe('/loadGame', function() {
  beforeEach(() => {
    const games = {
      loadGame: () => {}
    };

    app.games = games;
  });
  it('should load the game, when gamekey and player id is provided', function(done) {
    request(app)
      .post('/loadGame')
      .send({ gameKey: '1234', id: '5678' })
      .expect(302)
      .end(done);
  });
});

describe('/leaveGame', function() {
  beforeEach(function() {
    const games = {};
    const game = {
      leaveGame: () => {}
    };

    games.getGame = sinon.stub();
    games.getGame.returns(game);
    app.games = games;
  });
  it('should remove the player from the players and respond with 200 status code', function(done) {
    request(app)
      .get('/leaveGame')
      .expect(200)
      .end(done);
  });
});

describe('/playersCount', function() {
  beforeEach(function() {
    const games = {};
    const game = {
      leaveGame: () => {},
      getPlayersCount: () => 1
    };

    games.getGame = sinon.stub();
    games.getGame.returns(game);
    app.games = games;
  });
  it('should return the players count with status code 200', function(done) {
    request(app)
      .get('/playersCount')
      .expect(200)
      .end(done);
  });
});


describe('restrictAccess', function(){
  beforeEach(function() {
    const games = {};
    const game = {hasStarted: ()=>true};
    games.getGame = sinon.stub();
    games.getGame.returns(game);
    app.games = games;
  });
  
  it('should restrict the access to the restricted urls ',function(done){
    request(app)
      .get('/lobby')
      .expect(302)
      .expect('Location', '/game')
      .end(done);
  });

  it('should not restrict the access to the valid urls ',function(done){
    request(app)
      .get('/styles/main.css')
      .expect(200)
      .end(done);
  });
  
});