const request = require('supertest');
const app = require('../../src/app');
const chai = require('chai');

describe('homepage', function() {
  it('should return 200 status code for homepage', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .expect('content-type', 'text/html; charset=UTF-8')
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
