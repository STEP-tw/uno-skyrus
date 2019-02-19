const request = require('supertest');
const { app } = require('../../src/app');
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

describe('pile', function() {
  it('should return status 200', function(done) {
    request(app)
      .get('/pile')
      .expect(200)
      .end(done);
  });
  it('should return a card object as content', function(done) {
    request(app)
      .get('/pile')
      .expect('Content-Type', /json/)
      .end(done);
  });
  it('should return an Object of card with properties color and number', function(done) {
    request(app)
      .get('/pile')
      .expect(res => {
        chai.expect(res.body).to.have.all.keys('color', 'number');
      })
      .end(done);
  });
});

describe('gamepage', function() {
  it('should return 200 status code for gamepage', function(done) {
    request(app)
      .get('/game.html')
      .expect(200)
      .expect('content-type', 'text/html; charset=UTF-8')
      .end(done);
  });
});

describe('playerCards', function() {
  it('should return 200 status code for playerCards request and json content-type', function(done) {
    request(app)
      .get('/playerCards')
      .expect(200)
      .expect('content-type', 'application/json; charset=utf-8')
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

describe('serveLobby', function() {
  it('should return 200 status code for servelobby', function(done) {
    request(app)
      .get('/lobby.html')
      .expect(200)
      .expect('content-type', 'text/html; charset=utf-8')
      .expect(/Your game key/)
      .end(done);
  });
});

describe('player Status', function() {
  const games = {
    '1234': {
      getPlayers: () => ['reshmi'],
      getTotalPlayers: () => 1
    },
    '5678': {
      getPlayers: () => ['rahul','reshmi'],
      getTotalPlayers: () => 3
    },
    getGame: key => games[key]
  };

  it('should redirect to the /game.html url when all players will be joined', function(done) {
    app.games = games;
    request(app)
      .get('/playersStatus')
      .set('Cookie', 'gameKey=1234')
      .expect(302)
      .end(done);
  });

  it('should wait for all players to join, if all players are not joined yet', function(done) {
    app.games = games;
    request(app)
      .get('/playersStatus')
      .set('Cookie', 'gameKey=5678')
      .expect(200)
      .end(done);
  });
});
