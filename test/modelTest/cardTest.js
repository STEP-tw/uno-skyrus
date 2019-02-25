const { NumberedCard, WildCard } = require('./../../src/models/card');
const chai = require('chai');

describe('NumberedCard', function() {
  describe('canPlayOnTopOf', function() {
    it('should return true for a matching color', function() {
      const card = new NumberedCard(4, 'red');
      const actualOutput = card.canPlayOnTopOf(
        { number: 7, color: 'red' },
        'red'
      );
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

  describe('action', function() {
    it('should update current player index by 1', function() {
      const card = new NumberedCard(4, 'red');
      const currentPlayerIndex = 0;
      const actualOutput = card.action(currentPlayerIndex);
      const expectedOutput = 1;
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe('logMessage', function() {
    it('should return the log message', function() {
      const card = new NumberedCard(4, 'red');
      const actualOutput = card.logMessage();
      const expectedOutput = '4 red';
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});

describe('WildCard', function() {
  describe('canPlayOnTopOf', function() {
    it('should return true for each call', function() {
      const card = new WildCard();
      const actualOutput = card.canPlayOnTopOf();
      const expectedOutput = true;
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe('action', function() {
    it('should update current player index by 1', function() {
      const card = new WildCard();
      const currentPlayerIndex = 0;
      const actualOutput = card.action(currentPlayerIndex);
      const expectedOutput = 1;
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe('logMessage', function() {
    it('should return the log message', function() {
      const card = new WildCard();
      const actualOutput = card.logMessage();
      const expectedOutput = 'wildcard';
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});
