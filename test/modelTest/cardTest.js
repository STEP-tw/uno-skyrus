const { NumberedCard, WildCard, DrawTwo } = require('./../../src/models/card');
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

    it('should return false for any other card with symbol', function() {
      const card = new NumberedCard(4, 'red');
      const actualOutput = card.canPlayOnTopOf({ symbol: 7, color: 'green' });
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

describe('DrawTwoCard', function() {
  describe('canPlayOnTopOf', function() {
    it('should return true when color is same', function() {
      const card = new DrawTwo('red');
      const actualOutput = card.canPlayOnTopOf({ number: 2, color: 'red' }, 'red');
      const expectedOutput = true;
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });

    it('should return true when symbol is same', function() {
      const card = new DrawTwo('red');
      const actualOutput = card.canPlayOnTopOf({ symbol: '+2', color: 'blue' }, 'blue');
      const expectedOutput = true;
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });

    it('should return false when color and symbol is different', function() {
      const card = new DrawTwo('red');
      const actualOutput = card.canPlayOnTopOf({ number: 2, color: 'blue' }, 'blue');
      const expectedOutput = false;
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe('action', function() {
    it('should update current player index by 1', function() {
      const card = new DrawTwo('red');
      const currentPlayerIndex = 0;
      const actualOutput = card.action(currentPlayerIndex);
      const expectedOutput = 1;
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe('logMessage', function() {
    it('should return the log message', function() {
      const card = new DrawTwo('blue');
      const actualOutput = card.logMessage();
      const expectedOutput = '+2 blue';
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});
