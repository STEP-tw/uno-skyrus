const request = require('supertest');
const app = require('../../src/app');

describe('homepage', function() {
  it('should return 404 status code for homepage', function(done) {
    request(app)
      .get('/')
      .expect(404)
      .end(done);
  });
});
