const { NumberedCard } = require('./../../src/models/card');
const chai = require('chai');

describe('canPlayOnTopOf', function() {
  it('should return true for a matching color', function() {
    const card = new NumberedCard(4, 'red');
    const actualOutput = card.canPlayOnTopOf({ number: 7, color: 'red' });
    const expectedOutput = true;
    chai.assert.deepEqual(actualOutput, expectedOutput);
  });

  it('should return false for a non-matching color', function() {
    const card = new NumberedCard(4, 'red');
    const actualOutput = card.canPlayOnTopOf({ number: 7, color: 'green' });
    const expectedOutput = false;
    chai.assert.deepEqual(actualOutput, expectedOutput);
  });
});
