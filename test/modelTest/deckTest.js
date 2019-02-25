const { createDeck } = require('../../src/models/deck');
const chai = require('chai');

describe('createDeck', function() {
  it('should return the deck with given numbers and colors and four wild cards', function() {
    const numbers = [0, 1];
    const colors = ['red', 'green'];
    const expectedOutput = [
      { number: 0, color: 'red' },
      { number: 0, color: 'green' },
      { number: 1, color: 'red' },
      { number: 1, color: 'green' },
      { isWildCard: true },
      { isWildCard: true },
      { isWildCard: true },
      { isWildCard: true }
    ];
    const actualOutput = createDeck(numbers, colors);
    chai.assert.deepEqual(actualOutput, expectedOutput);
  });
});
