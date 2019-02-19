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
  it('should redirect to lobby.html', function(done) {
    request(app)
      .post('/hostGame')
      .expect(302)
      .expect('content-type', 'text/plain; charset=utf-8')
      .expect('Location', '/lobby.html')
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
      addPlayer: () => {},
      getTopDiscard: () => {
        return { color: 'red', number: 5 };
      }
    };
    games.getGame = sinon.stub();
    games.getGame.withArgs('1234').returns(game);

    app.games = games;
  });
  it('should return 200 status code for gamepage', function(done) {
    request(app)
      .get('/game.html')
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
    const game = {
      addPlayer: () => {},
      getTopDiscard: () => {
        return { color: 'red', number: 5 };
      },
      getPlayers: () => {
        return { getPlayers: () => ['player'] };
      },
      getPlayerCards: sinon
        .stub()
        .withArgs('player')
        .returns(cards)
    };
    games.getGame = sinon.stub();
    games.getGame.withArgs('1234').returns(game);

    app.games = games;
  });

  it('should return 200 status code for playerCards request and json content-type', function(done) {
    request(app)
      .get('/playerCards')
      .set('Cookie', 'gameKey=1234')
      .expect(200)
      .expect('content-type', 'application/json; charset=utf-8')
      .expect([{ color: 'red', number: 3 }])
      .end(done);
  });
});

describe('serveLobby', function() {
  it('should return 200 status code for servelobby', function(done) {
    request(app)
      .get('/lobby.html')
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
        startGame: () => {}
      },
      '5678': {
        getPlayers: () => {
          return { getNumberOfPlayers: sinon.stub().returns(2) };
        },
        getPlayersCount: sinon.stub().returns(1)
      },
      getGame: key => games[key]
    };
    app.games = games;
  });

  it('should redirect to the /game.html url when all players will be joined', function(done) {
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
});
