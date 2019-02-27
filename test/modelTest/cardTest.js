const {
  SkipCard,
  WildCard,
  NumberedCard,
  DrawTwo
} = require('./../../src/models/card');
const chai = require('chai');

describe('NumberedCard', function() {
  describe('canPlayOnTopOf', function() {
    it('should return true for a matching color', function() {
      const card = new NumberedCard(4, 'red');
      const hasDrawnTwo = true;
      const actualOutput = card.canPlayOnTopOf(
        { number: 7, color: 'red' },
        'red',
        hasDrawnTwo
      );
      const expectedOutput = true;
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });

    it('should return false for a non-matching color', function() {
      const card = new NumberedCard(4, 'red');
      const hasDrawnTwo = true;
      const actualOutput = card.canPlayOnTopOf(
        { number: 7, color: 'green' },
        'green',
        hasDrawnTwo
      );
      const expectedOutput = false;
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });

    it('should return false for a draw two card', function() {
      const card = new NumberedCard(4, 'red');
      const hasDrawnTwo = true;
      const actualOutput = card.canPlayOnTopOf(
        {
          symbol: '+2',
          color: 'green'
        },
        'green',
        hasDrawnTwo
      );
      const expectedOutput = false;
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });

    it('should return false for a draw two card and if player has not drawn the card', function() {
      const card = new NumberedCard(4, 'red');
      const hasDrawnTwo = false;
      const actualOutput = card.canPlayOnTopOf(
        {
          symbol: '+2',
          color: 'green',
          isDrawTwo: true
        },
        'green',
        hasDrawnTwo
      );
      const expectedOutput = false;
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });

    it('should return true for a draw tow card if hasDrawnTwo is true', function() {
      const card = new NumberedCard(4, 'red');
      const hasDrawnTwo = true;
      const runningColor = 'red';
      const actualOutput = card.canPlayOnTopOf(
        {
          symbol: '+2',
          color: 'green'
        },
        runningColor,
        hasDrawnTwo
      );
      const expectedOutput = true;
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

  describe('logMessage', function() {
    it('should return the log message', function() {
      const card = new NumberedCard(4, 'red');
      const actualOutput = card.getColor();
      const expectedOutput = 'red';
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

  describe('setColorAsDeclared', function() {
    it('should return true for each call', function() {
      const card = new WildCard();
      card.setColorAsDeclared();
      const actualOutput = card.isColorDeclared;
      const expectedOutput = true;
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe('action', function() {
    it('should not  update current player index', function() {
      const card = new WildCard();
      const currentPlayerIndex = 0;
      const actualOutput = card.action(currentPlayerIndex);
      const expectedOutput = 0;
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
      const actualOutput = card.canPlayOnTopOf(
        { number: 2, color: 'red' },
        'red'
      );
      const expectedOutput = true;
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });

    it('should return true when symbol is same', function() {
      const card = new DrawTwo('red');
      const actualOutput = card.canPlayOnTopOf(
        { symbol: '+2', color: 'blue' },
        'blue'
      );
      const expectedOutput = true;
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });

    it('should return false when color and symbol is different', function() {
      const card = new DrawTwo('red');
      const actualOutput = card.canPlayOnTopOf(
        { number: 2, color: 'blue' },
        'blue'
      );
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
    it('should return the log Message', function() {
      const card = new DrawTwo('blue');
      const actualOutput = card.logMessage();
      const expectedOutput = '+2 blue';
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});

describe('SkipCard', function() {
  let card;

  beforeEach(function() {
    const symbol = 'SKIP';
    const color = 'red';
    card = new SkipCard(symbol, color);
  });

  describe('canPlayOnTopOf', function() {
    it('should return true for a matching color regardless of the symbol', function() {
      const topDiscard = { number: 7, color: 'red' };
      const actualOutput = card.canPlayOnTopOf(topDiscard, 'red');
      const expectedOutput = true;
      chai.assert.equal(actualOutput, expectedOutput);
    });

    it('should return false for a non-matching color and symbol', function() {
      const topDiscard = { number: 7, color: 'green' };
      const actualOutput = card.canPlayOnTopOf(topDiscard, 'green');
      const expectedOutput = false;
      chai.assert.equal(actualOutput, expectedOutput);
    });

    it('should return true for a matching symbol regardless of the color', function() {
      const topDiscard = { isSkipCard: true, color: 'green' };
      const actualOutput = card.canPlayOnTopOf(topDiscard, 'green');
      const expectedOutput = true;
      chai.assert.equal(actualOutput, expectedOutput);
    });
  });

  describe('logMessage', function() {
    it('should return the log message', function() {
      const actualOutput = card.logMessage();
      const expectedOutput = 'Skip red';
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe('action', function() {
    it('should update current player index by 2', function() {
      const currentPlayerIndex = 0;
      const actualOutput = card.action(currentPlayerIndex);
      const expectedOutput = 2;
      chai.assert.equal(actualOutput, expectedOutput);
    });
  });
});
