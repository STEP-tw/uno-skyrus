const { createDeck } = require('../../src/models/deck');
const chai = require('chai');

describe('createDeck', function() {
  it('should return the deck with 96 cards', function() {
    const expectedOutput = 104;
    const actualOutput = createDeck().length;
    chai.assert.deepEqual(actualOutput, expectedOutput);
  });
});
