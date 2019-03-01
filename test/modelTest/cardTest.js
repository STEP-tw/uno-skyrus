const {
  SkipCard,
  WildCard,
  NumberedCard,
  DrawTwo,
  ReverseCard,
  WildDrawFour
} = require('./../../src/models/card');
const chai = require('chai');

describe('NumberedCard', function() {
  const hasDrawnTwo = true;
  const hasDrawnFour = true;

  describe('canPlayOnTopOf', function() {
    it('should return true for a matching color', function() {
      const card = new NumberedCard(4, 'red');
      const actualOutput = card.canPlayOnTopOf(
        { number: 7, color: 'red' },
        'red',
        hasDrawnTwo,
        hasDrawnFour
      );
      const expectedOutput = true;
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });

    it('should return false for a non-matching color', function() {
      const card = new NumberedCard(4, 'red');
      const actualOutput = card.canPlayOnTopOf(
        { number: 7, color: 'green' },
        'green',
        hasDrawnTwo,
        hasDrawnFour
      );
      const expectedOutput = false;
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });

    it('should return false for a draw two card', function() {
      const card = new NumberedCard(4, 'red');
      const actualOutput = card.canPlayOnTopOf(
        {
          symbol: '+2',
          color: 'green'
        },
        'green',
        hasDrawnTwo,
        hasDrawnFour
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
        hasDrawnTwo,
        hasDrawnFour
      );
      const expectedOutput = false;
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });

    it('should return true for a draw tow card if hasDrawnTwo is true', function() {
      const card = new NumberedCard(4, 'red');
      const runningColor = 'red';
      const actualOutput = card.canPlayOnTopOf(
        {
          symbol: '+2',
          color: 'green'
        },
        runningColor,
        hasDrawnTwo,
        hasDrawnFour
      );
      const expectedOutput = true;
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe('action', function() {
    it('should update current player index by 1', function() {
      const card = new NumberedCard(4, 'red');
      const currentPlayerIndex = 0;
      const actualOutput = card.action(1, currentPlayerIndex);
      const expectedOutput = { updatedIndex: 1 };
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

  describe('Util', function() {
    it('should give the color', function() {
      const card = new NumberedCard(4, 'red');
      const actualOutput = card.getColor();
      const expectedOutput = 'red';
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});

describe('WildCard', function() {
  const hasDrawnFour = true;
  const hasDrawnTwo = true;

  describe('canPlayOnTopOf', function() {
    it('should return false when hasDrawnTwo status is false', function() {
      const otherCard = {};
      const runningColor = 'red';
      const hasDrawnTwo = false;
      const card = new WildCard();
      const actualOutput = card.canPlayOnTopOf(
        otherCard,
        runningColor,
        hasDrawnTwo,
        hasDrawnFour
      );
      const expectedOutput = false;
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });

    it('should return true when hasDrawnTwo status is true', function() {
      const otherCard = {};
      const runningColor = 'red';
      const card = new WildCard();
      const actualOutput = card.canPlayOnTopOf(
        otherCard,
        runningColor,
        hasDrawnTwo,
        hasDrawnFour
      );
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
      const actualOutput = card.action(1, currentPlayerIndex);
      const expectedOutput = { updatedIndex: 0 };
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
  const hasDrawnFour = true;
  const hasDrawnTwo = true;

  describe('canPlayOnTopOf', function() {
    it('should return true when color is same', function() {
      const card = new DrawTwo('red');
      const actualOutput = card.canPlayOnTopOf(
        { number: 2, color: 'red' },
        'red',
        hasDrawnTwo,
        hasDrawnFour
      );
      const expectedOutput = true;
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });

    it('should return true when symbol is same', function() {
      const card = new DrawTwo('red');
      const actualOutput = card.canPlayOnTopOf(
        { symbol: '+2', color: 'blue' },
        'blue',
        hasDrawnTwo,
        hasDrawnFour
      );
      const expectedOutput = true;
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });

    it('should return false when color and symbol is different', function() {
      const card = new DrawTwo('red');
      const actualOutput = card.canPlayOnTopOf(
        { number: 2, color: 'blue' },
        'blue',
        hasDrawnTwo,
        hasDrawnFour
      );
      const expectedOutput = false;
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe('action', function() {
    it('should update current player index by 1', function() {
      const card = new DrawTwo('red');
      const currentPlayerIndex = 0;
      const actualOutput = card.action(1, currentPlayerIndex);
      const expectedOutput = { updatedIndex: 1 };
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

  describe('Utils', function() {
    it('should give the color', function() {
      const card = new DrawTwo('blue');
      const actualOutput = card.getColor();
      const expectedOutput = 'blue';
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});

describe('SkipCard', function() {
  let card;
  const hasDrawnTwo = true;
  const hasDrawnFour = true;

  beforeEach(function() {
    const symbol = 'SKIP';
    const color = 'red';
    card = new SkipCard(symbol, color);
  });

  describe('canPlayOnTopOf', function() {
    it('should return true for a matching color regardless of the symbol', function() {
      const topDiscard = { number: 7, color: 'red', isSkipCard: false };
      const actualOutput = card.canPlayOnTopOf(
        topDiscard,
        'red',
        hasDrawnTwo,
        hasDrawnFour
      );
      const expectedOutput = true;
      chai.assert.equal(actualOutput, expectedOutput);
    });

    it('should return false for a non-matching color and symbol', function() {
      const topDiscard = {
        number: 7,
        color: 'green',
        isSkipCard: false
      };
      const hasDrawnTwo = true;
      const actualOutput = card.canPlayOnTopOf(
        topDiscard,
        'green',
        hasDrawnTwo,
        hasDrawnFour
      );
      const expectedOutput = false;
      chai.assert.equal(actualOutput, expectedOutput);
    });

    it('should return true for a matching symbol regardless of the color', function() {
      const topDiscard = { isSkipCard: true, color: 'green' };
      const hasDrawnTwo = true;
      const actualOutput = card.canPlayOnTopOf(
        topDiscard,
        'green',
        hasDrawnTwo,
        hasDrawnFour
      );
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
      const actualOutput = card.action(1, currentPlayerIndex);
      const expectedOutput = { updatedIndex: 2 };
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe('Utils', function() {
    it('should give the color', function() {
      const card = new SkipCard('skip', 'blue');
      const actualOutput = card.getColor();
      const expectedOutput = 'blue';
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});

describe('ReverseCard', function() {
  let card;
  const hasDrawnFour = true;
  const hasDrawnTwo = true;

  beforeEach(function() {
    const symbol = 'REVERSE';
    const color = 'red';
    card = new ReverseCard(symbol, color);
  });

  describe('canPlayOnTopOf', function() {
    it('should return true for a matching color regardless of the symbol', function() {
      const topDiscard = { number: 7, color: 'red', isReverseCard: false };
      const actualOutput = card.canPlayOnTopOf(
        topDiscard,
        'red',
        hasDrawnTwo,
        hasDrawnFour
      );
      const expectedOutput = true;
      chai.assert.equal(actualOutput, expectedOutput);
    });

    it('should return false for a non-matching color and symbol', function() {
      const topDiscard = { number: 7, color: 'green', isReverseCard: false };
      const hasDrawnTwo = true;
      const actualOutput = card.canPlayOnTopOf(
        topDiscard,
        'green',
        hasDrawnTwo,
        hasDrawnFour
      );
      const expectedOutput = false;
      chai.assert.equal(actualOutput, expectedOutput);
    });

    it('should return true for a matching symbol regardless of the color', function() {
      const topDiscard = { isReverseCard: true, color: 'green' };
      const hasDrawnTwo = true;
      const actualOutput = card.canPlayOnTopOf(
        topDiscard,
        'green',
        hasDrawnTwo,
        hasDrawnFour
      );
      const expectedOutput = true;
      chai.assert.equal(actualOutput, expectedOutput);
    });
  });

  describe('logMessage', function() {
    it('should return the log message', function() {
      const actualOutput = card.logMessage();
      const expectedOutput = 'Reverse red';
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe('action', function() {
    it('should update current player index by 2', function() {
      const currentPlayerIndex = 0;
      const actualOutput = card.action(1, currentPlayerIndex);
      const expectedOutput = { turnDirection: -1, updatedIndex: -1 };
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe('Utils', function() {
    it('should give the color', function() {
      const card = new ReverseCard('reverse', 'blue');
      const actualOutput = card.getColor();
      const expectedOutput = 'blue';
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});

describe('WildDrawFour', function() {
  let card;
  const turnDirection = null;
  const hasDrawnTwo = true;
  const hasDrawnFour = true;

  beforeEach(function() {
    card = new WildDrawFour();
  });

  describe('action', function() {
    it('should not update the player index', function() {
      const currentIndex = 1;
      const actualOutput = card.action(turnDirection, currentIndex);
      const expectedOutput = { updatedIndex: 1 };
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });

    it('should set the property isColorDeclared as false if it is true', function() {
      const currentIndex = 0;
      card.isColorDeclared = true;
      card.action(turnDirection, currentIndex);
      const actualOutput = card.isColorDeclared;
      const expectedOutput = false;
      chai.assert.equal(actualOutput, expectedOutput);
    });

    it('should set the property isColorDeclared as false if it is false', function() {
      const currentIndex = 0;
      card.action(turnDirection, currentIndex);
      const actualOutput = card.isColorDeclared;
      const expectedOutput = false;
      chai.assert.equal(actualOutput, expectedOutput);
    });
  });

  describe('logMessage', function() {
    it('should return the log message', function() {
      const actualOutput = card.logMessage();
      const expectedOutput = 'Wild Draw Four';
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe('canPlayOnTopOf', function() {
    const topDiscard = null;
    const runningColor = null;

    it('should return true if no playable cards are available and hasDrawnTwo status is true', function() {
      const actualOutput = card.canPlayOnTopOf(
        topDiscard,
        runningColor,
        hasDrawnTwo,
        hasDrawnFour
      );
      const expectedOutput = true;
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });

    it('should reuturn false if no playable cards are available but hasDrawnTwo status is false', function() {
      const hasDrawnTwo = false;
      const actualOutput = card.canPlayOnTopOf(
        topDiscard,
        runningColor,
        hasDrawnTwo,
        hasDrawnFour
      );
      const expectedOutput = false;
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });

    it('should return false if playable cards are available and hasDrawnTwo status is false', function() {
      const hasDrawnTwo = false;
      const actualOutput = card.canPlayOnTopOf(
        topDiscard,
        runningColor,
        hasDrawnTwo,
        hasDrawnFour
      );
      const expectedOutput = false;
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe('SetColorAsDeclared', function() {
    it('should set property isColorDeclared as true', function() {
      card.setColorAsDeclared();
      const actualOutput = card.isColorDeclared;
      const expectedOutput = true;
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});
