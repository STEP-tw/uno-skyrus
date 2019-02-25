const { createDeck } = require('../../src/models/deck');
const chai = require('chai');

describe('createDeck', function() {
  it('should return the deck with given numbers and colors and four wild cards', function() {
    // const numbers = [0, 1];
    // const colors = ['red', 'green'];
    const expectedOutput = 80;
    const actualOutput = createDeck().length;
    chai.assert.deepEqual(actualOutput, expectedOutput);
  });
});
