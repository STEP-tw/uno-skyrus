const { createDeck } = require('../../src/models/deck');
const chai = require('chai');

describe('createDeck', function() {
  it('should return the deck with given numbers and colors and four wild cards', function() {
    const expectedOutput = 92;
    const actualOutput = createDeck().length;
    chai.assert.deepEqual(actualOutput, expectedOutput);
  });
});
