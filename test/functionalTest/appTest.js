const request = require('supertest');
const app = require('../../src/app');

describe('homepage', function() {
  it('should return 200 status code for homepage', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .expect('content-type','text/html; charset=UTF-8')
      .end(done);
  });
});

describe('gamepage', function() {
  it('should return 200 status code for gamepage', function(done) {
    request(app)
      .get('/game.html')
      .expect(200)
      .expect('content-type','text/html; charset=UTF-8')
      .end(done);
  });
});
