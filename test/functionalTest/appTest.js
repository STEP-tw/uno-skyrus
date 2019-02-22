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
      .expect(/Host Game/)
      .end(done);
  });
});

describe('hostGame', function() {
  it('should redirect to lobby', function(done) {
    const games = {
      addGame: () => {}
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

describe('pile', function() {
  beforeEach(function() {
    const games = {};
    const game = {
      addPlayer: () => {},
      getTopDiscard: () => {
        return { color: 'red', number: 5 };
      }
    };
    games.getGame = sinon.stub();
    games.getGame.withArgs('1234').returns(game);

    app.games = games;
  });

  it('should return a card object as content', function(done) {
    request(app)
      .get('/pile')
      .set('Cookie', 'gameKey=1234')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(done);
  });

  it('should return an Object of card with properties color and number', function(done) {
    request(app)
      .get('/pile')
      .set('Cookie', 'gameKey=1234')
      .expect(res => {
        chai.expect(res.body).to.have.all.keys('color', 'number');
      })
      .end(done);
  });
});

describe('gamepage', function() {
  beforeEach(function() {
    const games = {};
    const game = {
      playersCount: 2,
      addPlayer: () => {},
      getTopDiscard: () => {
        return { color: 'red', number: 5 };
      }
    };
    games.getGame = sinon.stub();
    games.getGame.withArgs('1234').returns(game);

    app.games = games;
  });
  it('should return 200 status code for gamepage and give the template according to the number of players', function(done) {
    request(app)
      .get('/2player_game')
      .set('Cookie', 'gameKey=1234')
      .expect(200)
      .expect('content-type', 'text/html; charset=UTF-8')
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
  beforeEach(function() {
    const games = {};

    const players = {};
    players.addPlayer = sinon.stub();

    const game = {};
    game.getPlayers = sinon.stub();
    game.getPlayers.returns(players);

    games.doesGameExist = sinon.stub();
    games.doesGameExist.withArgs(1234).returns(true);
    games.doesGameExist.returns(false);
    games.getGame = sinon.stub();
    games.getGame.withArgs(1234).returns(game);

    app.games = games;
  });

  it('should response with 200 status code', function(done) {
    request(app)
      .post('/joinGame')
      .send({ playerName: 'Rishab', gameKey: 1234 })
      .expect(200)
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
      .expect(/Your game key/)
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
        getPlayersCount: sinon.stub().returns(1),
        hasStarted: () => false
      },
      '2345': {
        getPlayers: () => {
          return { getNumberOfPlayers: sinon.stub().returns(2) };
        },
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
  let player;
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

    const game = {
      getPlayers: () => players,
      getTopDiscard: () => card,
      drawCard: () => {},
      getPlayerCards: () => [card]
    };

    const games = {
      1234: game,

      getGame: () => game
    };

    app.games = games;
  });
  it('should remove card from stack and add it to the hand', done => {
    request(app)
      .get('/drawCard')
      .set('Cookie', 'gameKey=1234; id=5678')
      .expect(200)
      .end(done);
  });
  it('should remove card from stack and add it to the hand', done => {
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
});

describe('get players', () => {
  beforeEach(() => {
    const players = {
      getPlayers: () => [
        { name: 'Aftab', id: '5678' },
        { name: 'Rahul', id: '2678' }
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

describe('serveLog', function() {
  it('should return 200 status code for serveLog', function(done) {
    const games = {
      1234: {
        activityLog: {
          getLatestLog: () => {
            return 'latest log';
          }
        }
      },
      getGame: () => {
        return games['1234'];
      }
    };

    app.games = games;
    request(app)
      .get('/serveLog')
      .set('Cookie', 'gameKey=1234')
      .expect(200)
      .expect('content-type', 'text/plain; charset=utf-8')
      .end(done);
  });
});
